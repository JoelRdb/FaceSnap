import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './components/login/login';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,     
 ]
})
export class AuthModule { }
