import {CanActivateFn, Router} from '@angular/router';
import {AuthStateService} from "../services/states/auth-state.service";
import {inject} from "@angular/core";

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authStateService = inject(AuthStateService);
  let router = inject(Router);

  if(authStateService.authState.roles.includes('ADMIN')){
    return true;
  }
  else{
    router.navigateByUrl("/admin/customers");
    return false;
  }
};
