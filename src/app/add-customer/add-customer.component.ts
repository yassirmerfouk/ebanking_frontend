import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{

  public formGroup! : FormGroup;
  public error! : string;
  constructor(
    private formBuilder : FormBuilder,
    private customerService : CustomerService
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        firstName : this.formBuilder.control("", [Validators.required]),
        lastName : this.formBuilder.control("", [Validators.required]),
        email : this.formBuilder.control("", [Validators.required, Validators.email])
      }
    );
  }

  public addCustomer() : void{
    let customer : Customer = this.formGroup.value;
    this.customerService.addCustomer(customer).subscribe(
      {
        next : (data) => {
          alert("Customer added with success");
          this.formGroup.reset();
        }, error : (error) => {
          this.error = error.value;
        }
      }
    );
  }
}
