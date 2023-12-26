import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../models/customer.model";
import {CurrentAccountRequest, SavingAccountRequest} from "../models/account.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit{

  public formGroup! : FormGroup;
  public customers! : Array<Customer>;
  constructor(
    private accountService : AccountService,
    private customerService : CustomerService,
    private formBuilder : FormBuilder,
    private router : Router
  ) {
  }
  ngOnInit() {
    this.getCustomers();
      this.formGroup = this.formBuilder.group(
        {
          type : this.formBuilder.control(null, [Validators.required]),
          customerId : this.formBuilder.control(null,[Validators.required]),
          balance : this.formBuilder.control(null,[Validators.required]),
          status : this.formBuilder.control(null,[Validators.required]),
          overDraft : this.formBuilder.control(null),
          interestRate : this.formBuilder.control(null),
        }
      );
  }

  public getCustomers() : void{
    this.customerService.getCustomers().subscribe(
      {
        next : (data) => {this.customers = data},
        error : (error) => {console.log(error)}
      }
    );
  }

  public addAccount(){
    if(this.formGroup.value.type == "CURRENT"){
      let currentAccount : CurrentAccountRequest = this.formGroup.value;
      this.accountService.addCurrentAccount(currentAccount).subscribe(
        {
          next: (data) => {
            alert("account add with success");
            this.router.navigateByUrl("/admin/customer-accounts/" + currentAccount.customerId);
          },
          error : (error) => {console.log(error)}
        }
      );
    }if(this.formGroup.value.type == "SAVING"){
      let savingAccount : SavingAccountRequest = this.formGroup.value;
      this.accountService.addSavingAccount(savingAccount).subscribe(
        {
          next : (data) => {
            alert("account add with success");
            this.router.navigateByUrl("/admin/customer-accounts/" + savingAccount.customerId);
          },
          error : (error) => {console.log(error)}
        }
      );
    }
  }

  public onChangeType() : void{
/*    if(this.formGroup.value.type == "CURRENT"){
      this.formGroup.get("overDraft")?.setValidators([Validators.required]);
      this.formGroup.get("interestRate")?.setValidators([]);
    }
    if(this.formGroup.value.type == "SAVING"){
      this.formGroup.get("interestRate")?.setValidators([Validators.required]);
      this.formGroup.get("overDraft")?.setValidators([]);
    }*/
  }
}
