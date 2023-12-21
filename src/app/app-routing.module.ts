import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {AddCustomerComponent} from "./add-customer/add-customer.component";
import {OperationsComponent} from "./operations/operations.component";

const routes: Routes = [
  {path : "customers", component : CustomersComponent},
  {path : "accounts", component : AccountsComponent},
  {path : "add-customer", component : AddCustomerComponent},
  {path : "customer-accounts/:customerId", component : AccountsComponent},
  {path : "operations", component : OperationsComponent},
  {path : "operations/:accountId", component : OperationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
