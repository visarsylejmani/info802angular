import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const res  = this.authService.isLoggedIn();
      if(res !== true) {
        this.router.navigate(['sign-in'])
      }
    return true;
  }
  
}
