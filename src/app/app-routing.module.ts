import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {AddCustomerComponent} from "./add-customer/add-customer.component";
import {OperationsComponent} from "./operations/operations.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  {path : "login", component: LoginComponent},
  {path : "", component : LoginComponent},
  {path : "admin",component : AdminComponent, canActivate : [authenticationGuard] ,children : [
      {path : "customers", component : CustomersComponent},
      {path : "accounts", component : AccountsComponent},
      {path : "add-customer", component : AddCustomerComponent, canActivate : [authorizationGuard]},
      {path : "customer-accounts/:customerId", component : AccountsComponent},
      {path : "operations", component : OperationsComponent},
      {path : "operations/:accountId", component : OperationsComponent},
      {path : "add-account", component : AddAccountComponent, canActivate : [authorizationGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
