import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  public authState : AuthState = {
    authenticated : false,
    username : "",
    roles : "",
    accessToken : ""
  }
  constructor() { }

  public setAuthState(authState : any) : void{
    this.authState = authState;
  }

  public hasRole(role : string){
    return this.authState.roles.includes(role);
  }
}

export interface AuthState{
  authenticated : boolean,
  username : string,
  roles : string,
  accessToken : string
}
