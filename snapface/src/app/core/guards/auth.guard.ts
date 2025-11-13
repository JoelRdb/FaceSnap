import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    /**
     *
     */
    constructor(private auth: AuthService, private router: Router) {
        
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { // sera appelé à chaque fois qu'un utilisteur essayera d'accéder aux routes qu'on a protéger avec canActivate: [AuthGuard] dans FaceSnapsRoutingModule
        if(this.auth.getToken()){
            return true;
        }else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
    
}