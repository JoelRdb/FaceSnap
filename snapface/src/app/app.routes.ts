import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page-component/landing-page-component';

export const routes: Routes = [    
    { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps-module').then(m => m.FaceSnapsModule) }, // Implémentation de Lazy loading (une approche de routing: tout le code lié à un module ne sera chargé que lorsque sa route sera chargé) 
    { path: 'auth', loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)},
    { path: '', component: LandingPageComponent}       
];
