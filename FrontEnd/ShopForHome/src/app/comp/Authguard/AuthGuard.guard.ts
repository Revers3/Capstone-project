import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/User.Service";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    constructor(private userService: UserService, private router:Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.userService.isUserAuthenticated())
        {
            return true;
        } else 
        {
            this.router.navigate(['/']);
            return false;
        }
        
    }
    
    
}