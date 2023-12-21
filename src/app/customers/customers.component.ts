import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  public customers! : Array<Customer>;
  public formGroup! : FormGroup;

  constructor(
    private customerService : CustomerService,
    private formBuilder : FormBuilder,
    private router : Router
  ) {
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {keyword : this.formBuilder.control("")}
    );
    this.getCustomers();
  }

  public getCustomers() : void{
    this.customerService.getCustomers().subscribe(
      {
        next : (data) => this.customers = data,
        error : (error) => console.log(error)
      },
    );
  }

  public searchCustomers() : void{
    let lastName : String = this.formGroup.value.keyword;
    this.customerService.getCustomersByLastName(lastName).subscribe(
      {
        next : (data) => this.customers = data,
        error : (error) => console.log(error)
      }
    )
  }

  public deleteCustomer(customer : Customer) : void{
    let conf = confirm("Are you sure?");
    if(conf){
      this.customerService.deleteCustomer(customer.id).subscribe(
        {
          next : (data) => {
            this.customers = this.customers.filter(x => x.id != customer.id);
          },
          error : (error) => {
            console.log(error);
          }
        }
      );
    }
  }

  public toAddCustomer() : void{
    this.router.navigateByUrl("/add-customer");
  }

  public toCustomerAccounts(customerId : number){
    this.router.navigateByUrl("/customer-accounts/" + customerId);
  }

}
