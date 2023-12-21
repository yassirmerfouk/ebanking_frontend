import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer.model";
import {Account} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = "http://localhost:8080/customers";
  constructor(private httpClient: HttpClient) { }

  public getCustomers() : Observable<Array<Customer>>{
    return this.httpClient.get<Array<Customer>>(this.apiUrl);
  }

  public getCustomersByLastName(lastName : String) : Observable<Array<Customer>>{
    return this.httpClient.get<Array<Customer>>(this.apiUrl + "/search/lastname?keyword=" +lastName);
  }

  public addCustomer(customer : Customer) : Observable<Customer>{
    return this.httpClient.post<Customer>(this.apiUrl , customer);
  }

  public deleteCustomer(customerId : number) : Observable<any>{
    return this.httpClient.delete(this.apiUrl + "/" + customerId);
  }

  public getCustomerAccounts(customerId : number) : Observable<Array<Account>>{
    return this.httpClient.get<Array<Account>>(this.apiUrl + "/" + customerId + "/accounts")
  }
}
