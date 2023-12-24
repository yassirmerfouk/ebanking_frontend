import {Customer} from "./customer.model";

export interface Account{
  id : number,
  createdAt : Date
  balance : number,
  status : string,
  type : string,
  customer : Customer
}

export interface CurrentAccountRequest{
  balance : number,
  status : string,
  overDraft : number,
  customerId : number
}

export interface SavingAccountRequest{
  balance : number,
  status : string,
  interestRate : number,
  customerId : number
}
