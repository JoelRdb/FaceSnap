import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    Header,
  ],
  exports: [
    Header // Pour que app.ts puisse l'utiliser via CoreModule
  ],
})
export class CoreModule { }
