import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../models/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  public accounts! : Array<Account>;
  public customerId! : number;
  constructor(
    private customerService : CustomerService,
    private router : Router,
    private route : ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.getCustomerAccounts();
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

  getAccountOperations(accountId: number) {
    this.router.navigateByUrl("/operations/"+accountId);
  }
}
