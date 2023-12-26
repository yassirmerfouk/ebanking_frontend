import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {AuthStateService} from "./states/auth-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = "http://localhost:8080/auth"
  constructor(
    private httpClient : HttpClient,
    private authStateService : AuthStateService
  ) { }

  public login(username : string, password : string ) : Observable<any>{
    return this.httpClient.post(this.apiUrl + "/login", {
      username : username,
      password : password
    })
  }

  public loadUser(accessToken : string) : void{
    let payload: any = jwtDecode(accessToken);
    this.authStateService.setAuthState(
      {
        authenticated : true,
        username : payload.sub,
        roles : payload.scope,
        accessToken : accessToken
      }
    );
  }

  public storeUser(accessToken : string) : void{
    localStorage.setItem("jwt", accessToken);
  }

  public loadUserFromLocalStorage() : void{
    let jwt = localStorage.getItem("jwt");
    if(jwt != null){
      this.loadUser(jwt);
    }
  }

  public logout(){
    localStorage.removeItem("jwt");
    this.authStateService.setAuthState({
      authenticated : false,
      username : "",
      roles : "",
      accessToken : ""
    });
  }
}
