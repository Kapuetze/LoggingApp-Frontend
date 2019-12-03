import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        let url: string = state.url;

        if (this.userService.isLoggedIn()) { 
            return true; 
        }

        const urlParameters = Object.assign({}, next.queryParams); 
        urlParameters["next"] = url;

        // Navigate to the login page with extras
        this.router.navigate(['/user', 'login'], { queryParams: urlParameters });
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}