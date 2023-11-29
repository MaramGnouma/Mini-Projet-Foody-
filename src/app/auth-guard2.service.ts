import { Injectable } from '@angular/core';
import { AuthService } from './auth-guard.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2Service  implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      // Check if the user is authenticated
      if (this.authService.isAuthenticated()) {
        return true; // Allow navigation
      } else {
        // Redirect to the login page if not authenticated
        return this.router.createUrlTree(['/login']);
      }
    }
  }
