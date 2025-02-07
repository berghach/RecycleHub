import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/auth/login.service";

@Injectable({
    providedIn: 'root'
})

export class ParticularGuard {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.loginService.getLoggedInUser();

        if (isLoggedIn) {
            if (isLoggedIn.role === 'particular'){
                return true;
            }else{
                this.router.navigate(['/profile']);
                return false;
            }
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}