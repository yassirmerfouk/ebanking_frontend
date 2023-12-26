import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm! : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        username : this.formBuilder.control(null, [Validators.required]),
        password : this.formBuilder.control(null, [Validators.required])
      }
    );
  }

  public login() : void {
    let username : string = this.loginForm.value.username;
    let password : string = this.loginForm.value.password;
    this.authService.login(username,password).subscribe(
      {
        next : (data) =>{
          this.authService.loadUser(data.accessToken);
          this.authService.storeUser(data.accessToken);
          this.router.navigateByUrl("/admin/customers");
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }

}
