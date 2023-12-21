import {Operation} from "./operation.model";

export interface PageOperation{
  customerId : number,
  fullName : string,
  email : string,
  accountId : string,
  balance : number,
  page : number,
  size : number,
  totalPages : number
  operations : Array<Operation>
}
