import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export class User {
  constructor(public status: string) {}
}

export class JwtResponse {
  constructor(public jwttoken: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
    return this.httpClient
      .post<any>('http://productserviceloadbalancer-2101711574.ap-south-1.elb.amazonaws.com/authenticate', { username, password })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('role', userData.role);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user == null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }

}
