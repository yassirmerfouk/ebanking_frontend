import {Customer} from "./customer.model";

export interface Account{
  id : number,
  createdAt : Date
  balance : number,
  status : string,
  type : string,
  customer : Customer
}
