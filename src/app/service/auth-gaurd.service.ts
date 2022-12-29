import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

constructor(
    private router: Router,
    private authservice: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authservice.isUserLoggedIn())
    {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
