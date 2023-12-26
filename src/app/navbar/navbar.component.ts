import { Component } from '@angular/core';
import {AuthStateService} from "../services/states/auth-state.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
   public authStateService : AuthStateService,
   private authService : AuthService,
   private router : Router
  ) {
  }

  public logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
