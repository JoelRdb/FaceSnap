import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [
    // RouterLink,
    FormsModule
  ],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss',
})
export class LandingPageComponent {

  motDeBienvenue: string = "Welcome to SnapFace";
  imageLandingPage: string = "assets/Gemini_Generated_Image_58oyl258oyl258oy.png";

  userEmail!: string; 
  userPassword!: string;


  constructor(private router: Router) {
    
    
  }

  onContinue(){
    this.router.navigateByUrl('facesnaps');
  }

  onSubmitForm(form: NgForm) : void{
    console.log(form.value);
  }
}
