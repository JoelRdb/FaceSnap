import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concatMap, delay, exhaustMap, filter, interval, map, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CoreModule } from './core/core-module';
import { LandingPageModule } from './landing-page/landing-page-module';
import { AuthModule } from './auth/auth-module';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    CoreModule,
    LandingPageModule,
    AuthModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{

  // Un Observable est un objet qui émet une valeur à tout instant
  interval$!: Observable<string>;//$ : nomenclature, tous ce qui est observable, le nom de variable se termine par $

  // Les opérateurs de bas niveau
  // ngOnInit(): void {
  //   this.interval$ = interval(1000).pipe( // pipe permet d'appliquer des opérateurs à un Observable. L'ordre des opérateurs est extremement importants. (Branchez le tuyau avec pipe)
  //     filter(value => value % 3 === 0), // opérateur pour filtrer les opérations
  //     map(value => value % 2 === 0 ? `Je suis ${value} pair` : `Je suis ${value} impair`), // map est un opérateur permettant de transformer les émissions d'un Observable
  //     tap(text => this.Logger(text)) // opérateur d'effet secondaire : une fonction qui fait quelque chose avec les émissions d'un Observable sans les modifier.
  //   ); // filter, map et tap sont alors des opérateurs de bas niveau.
  // }

    Logger(text : string) {
    console.log(`Log: ${text}`);
  }



  // Les opérateurs de haut niveau
  // mergeMap : Assure la mise en parallèle : l'Observable extérieur peut souscrire aux Observables intérieurs suivants sans attendre que les précédents soient complétés. 
  // concatMap : Assure la mise en série : il attend que les Observables intérieurs complètent avant de souscrire aux suivants– même si l'Observable extérieur émet plusieurs fois. Les Observables intérieurs seront traités en séquence à la suite.
  // exhaustMap : Assure le traitement complet d'une souscription avant d'observer une nouvelle émission de l'Observable extérieur. Si d’autres demandes sont faites entre temps, elles ne seront pas prises en compte. 
  // switchMap : Traite la dernière demande de souscription de l’Observable extérieur et annule toute souscription précédente non-complétée.


  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit() {
    interval(500).pipe(
      take(6),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(color => this.getTrainObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune'){
    return color === 'rouge' ?  'rouge' : 'jaune';
  }

  
}
