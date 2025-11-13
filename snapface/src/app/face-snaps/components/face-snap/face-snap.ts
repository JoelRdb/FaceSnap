import { Component, Input, OnInit } from '@angular/core';
import { FacesSnaps } from '../../../core/models/face-snap';
import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgStyle, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../../../core/services/face-snaps.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone : true,
  imports: [
    // NgStyle, // c'est une directive (classe) qui permet d'ajouter du comportement à notre template, dans notre cas, changement de couleur en vert (rgb: g en fonction de snap)
    // NgClass, // c'est aussi une directive mais qui permet d'ajouter dynamiquement des classes à des éléments HTML, dans notre cas, changement de couleur en vert si snap Liker
    UpperCasePipe, // Ne change rien à la valeur des variables sous-jacent mais existe pour modifier le format affiché d'une donnée en string interpolation.
    // TitleCasePipe,
    // DatePipe,
    // DecimalPipe, //number lors de son utilisation dans le html
    // PercentPipe,
    // CurrencyPipe
  ],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss',
})
export class FaceSnap {
  
  @Input() faceSnap!: FacesSnaps; // Propriété personnalisé :  pour permettre a cet propriété d'etre injecté depuis son parent (app.html)

  constructor(private router : Router) {
    
    
  }

  onViewFaceSnap(){
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

}
