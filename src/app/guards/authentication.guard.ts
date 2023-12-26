import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthStateService} from "../services/states/auth-state.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  let authStateService = inject(AuthStateService);
  let router = inject(Router);
  if(!authStateService.authState.authenticated){
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
