import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgStyle, PercentPipe, TitleCasePipe, UpperCasePipe, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FacesSnaps } from '../../../core/models/face-snap';
import { FaceSnapsService } from '../../../core/services/face-snaps.services';

@Component({
  selector: 'app-single-face-snap',
  standalone : true,
  imports: [
    NgStyle, // c'est une directive (classe) qui permet d'ajouter du comportement à notre template, dans notre cas, changement de couleur en vert (rgb: g en fonction de snap)
    NgClass, // c'est aussi une directive mais qui permet d'ajouter dynamiquement des classes à des éléments HTML, dans notre cas, changement de couleur en vert si snap Liker
    UpperCasePipe, // Ne change rien à la valeur des variables sous-jacent mais existe pour modifier le format affiché d'une donnée en string interpolation.
    TitleCasePipe,
    DatePipe,
    // DecimalPipe, //number lors de son utilisation dans le html
    PercentPipe,
    CurrencyPipe,
    RouterLink,
    NgIf,
    AsyncPipe
],
  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.scss',
})
export class SingleFaceSnap implements OnInit{
  // Propriété personnalisé :  pour permettre a cet propriété d'etre injecté
  faceSnap$!: Observable<FacesSnaps>;
  userHasSnapped!: boolean;
  snapButtonText!: string; 

  stateThumb!: string;


constructor(private faceSnapService : FaceSnapsService, private route : ActivatedRoute) {

}

  ngOnInit(): void {   
    this.prepareInterface();

    this.getFaceSnap();
  }

  onSnap(faceSnapId: number) : void{ //Nomenclature : on : nom de méthode qui commence par 'on' signale que cette méthode répond à un évènement
    if(this.userHasSnapped)
    {
      this.unSnap(faceSnapId);
    }
    else{
      this.snap(faceSnapId);
    }
  }

  unSnap(faceSnapId: number){
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => {
          this.faceSnapService.getFaceSnapById(faceSnapId);
          this.snapButtonText = 'Like';
          this.stateThumb = '👍';
          this.userHasSnapped = false;
        })
      );
  }

  snap(faceSnapId: number){
       this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => {        
          this.snapButtonText = 'Unlike';
          this.stateThumb = '👎'; 
          this.userHasSnapped = true;
        })
      );
  }

  private getFaceSnap(){
    const faceSnapId = this.route.snapshot.params['id']; //récupérer l'id du facesnap
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
  }

  private prepareInterface(){
    this.userHasSnapped = false;
    this.snapButtonText = 'Like';
    this.stateThumb = '👍' ;
  }

}
