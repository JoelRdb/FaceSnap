import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{


  constructor(private router : Router, private auth: AuthService) {
    
   
  }
  ngOnInit(): void {

  }


  onLogin(): void{
      this.auth.login();
      this.router.navigateByUrl('/facesnaps');
  }
}
