import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../face-snap/face-snap';
import { FacesSnaps } from '../../../core/models/face-snap';
import { FaceSnapsService } from '../../../core/services/face-snaps.services';
import { interval, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnap,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss',
})
export class FaceSnapList implements OnInit, OnDestroy{ //ngOnInit, OnDestroy  sont des lifecycle hook

  mesFaceSnaps!: FacesSnaps[]; // récupère les données brute du service
  private destroy$!: Subject<boolean>;  // Subject, un type spécial d'observable
  faceSnaps$!: Observable<FacesSnaps[]>; // récupère les données de notre backend json, httpClient

  constructor(private faceSnapService : FaceSnapsService) {
       
  }


  ngOnInit(): void{     
    this.destroy$ = new Subject<boolean>();
    // this.mesFaceSnaps = this.faceSnapService.getFaceSnaps();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();

    interval(1000).pipe(
      // take(1), // un observalble complète ; un observalble complète est détruite, pas de fuite de mémoire.
      takeUntil(this.destroy$),
      tap(console.log) // c'est raccourci de tap(value => console.log(value));
    ).subscribe();  // seule les Observables souscrits avec la méthode subscribe() qui nécessitent une stratégie de unsubscribe. Tout observable souscrit avec le pipe async est automatiquement unsubscribe lors de la desctruction

  }

    ngOnDestroy(): void { // la norme est de l'ajouter à la fin de la classe
      this.destroy$.next(true);
  }
}
