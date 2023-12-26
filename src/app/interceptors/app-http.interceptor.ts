import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthStateService} from "../services/states/auth-state.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authStateService : AuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("auth")){
      let newRequest  = request.clone(
        {
          headers : request.headers.set("Authorization", "Bearer " + this.authStateService.authState.accessToken)
        }
      );
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
