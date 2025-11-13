import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page-component/landing-page-component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LandingPageComponent,
    FormsModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
