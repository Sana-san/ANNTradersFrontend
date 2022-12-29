import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public basicAuth: AuthenticationService) { }
 user_role = sessionStorage.getItem('role');  
  ngOnInit() {
    
  }
}
