import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FaceSnapsService } from '../../../core/services/face-snaps.services';
import { FacesSnaps } from '../../../core/models/face-snap';

@Component({
  selector: 'app-new-face-snap',
  imports: [
    ReactiveFormsModule,    // Pour lier un objet de type FormGroup à un <form> avec l'attribut formGroup dans le template Html
    DatePipe,
    CommonModule
],
  templateUrl: './new-face-snap.html',
  styleUrl: './new-face-snap.scss',
})
export class NewFaceSnap implements OnInit{

  snapForm!: FormGroup; //type de formulaire reactive(TypeScript) différent de NgForm qui est le type de form template(HTML). C'est notre Objet du formaulaire
  faceSnapPreview$!: Observable<FacesSnaps>;
  urlRegex!: RegExp;

  constructor(private formBuilder : FormBuilder, 
              private faceSnapService: FaceSnapsService,
              private router: Router) {
    
  }
  
  ngOnInit(): void {
  this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/; // format requis pour l'url

   this.snapForm = this.formBuilder.group({  // Construction de notre formulaire (en lien avec le formControlName dans le template Html)
    title: [null, Validators.required],
    description: [null, Validators.required],
    imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
    location: [null]
   },{
    updateOn: 'blur' // le formulaire n'est mis à jour que lorsqu'il y a un évènement Blur sur le input, c'est à dire lorsqu'on change de champ
   });

   this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(  //valuesChanges : Observalbe qui emet tous l'objet du FormGroup à chaque fois que la valeur d'un des champs change
      map(formValue => ({ 
          ...formValue, 
          createdAt: new Date(),
          id: 0,
          snaps: 0
      }))
   );
  }

  onSubmitForm(): void{
    console.log(this.snapForm.value);
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe()
  }


}
