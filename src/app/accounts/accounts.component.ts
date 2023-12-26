import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../models/account.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  public accounts! : Array<Account>;
  public customerId! : number;
  private path! : string;
  constructor(
    private customerService : CustomerService,
    private accountService : AccountService,
    private router : Router,
    private route : ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.route.url.subscribe({
      next : (url) => {this.path = url[0].path;}
    });
    if(this.path == "customer-accounts")
    this.getCustomerAccounts();
    if(this.path == "accounts")
      this.getAccounts();
  }

  public getCustomerAccounts() : void{
    this.customerService.getCustomerAccounts(this.customerId).subscribe(
      {
        next : (data) => {
          this.accounts = data;
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }

  public getAccounts() : void{
    this.accountService.getAccounts().subscribe({
      next : (data) => {
        this.accounts = data;
      },
      error : (error) => {console.log(error);}
    });
  }

  getAccountOperations(accountId: number) {
    this.router.navigateByUrl("/admin/operations/"+accountId);
  }
}
