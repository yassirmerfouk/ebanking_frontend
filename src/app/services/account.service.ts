import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageOperation} from "../models/page-operation.model";
import {Account, CurrentAccountRequest, SavingAccountRequest} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl : string = "http://localhost:8080/accounts"

  constructor(private httpClient : HttpClient) { }

  public getAccounts() : Observable<Array<Account>>{
    return this.httpClient.get<Array<Account>>(this.apiUrl);
  }

  public getAccountOperations(accountId : string, page : number, size : number) : Observable<PageOperation>{
    return this.httpClient.get<PageOperation>(this.apiUrl + "/" +accountId + "/operations/page?page="+page+"&size="+size)
  }

  public debit(accountId : string, amount : number) : Observable<any>{
    return this.httpClient.post(this.apiUrl + "/debit", {
      accountId : accountId, amount : amount
    })
  }

  public credit(accountId : string, amount : number) : Observable<any>{
    return this.httpClient.post(this.apiUrl + "/credit", {
      accountId : accountId, amount : amount
    })
  }

  public transfer(sourceAccountId : string,destAccountId : string, amount : number) : Observable<any>{
    return this.httpClient.post(this.apiUrl + "/transfer", {
      sourceAccountId : sourceAccountId,destAccountId : destAccountId, amount : amount
    })
  }

  public addCurrentAccount(currentAccount : CurrentAccountRequest) : Observable<Account>{
    return this.httpClient.post<Account>(this.apiUrl + "/currents", currentAccount);
  }

  public addSavingAccount(savingAccount : SavingAccountRequest) : Observable<Account>{
    return this.httpClient.post<Account>(this.apiUrl + "/savings", savingAccount);
  }
}
