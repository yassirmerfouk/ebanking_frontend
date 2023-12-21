import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {PageOperation} from "../models/page-operation.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  private accountId!: string;
  public pageOperations!: PageOperation;
  public searchFormGroup!: FormGroup;
  public operationFormGroup!: FormGroup;
  public page: number = 0;
  public size: number = 5;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['accountId']) {
      this.accountId = this.route.snapshot.params['accountId'];
      this.getPageOperations();
    }
    this.searchFormGroup = this.formBuilder.group(
      {
        accountId: this.formBuilder.control(null)
      }
    );
    if (this.accountId) {
      this.operationFormGroup = this.formBuilder.group(
        {
          option: this.formBuilder.control(null, [Validators.required]),
          destAccountId: this.formBuilder.control(null),
          amount: this.formBuilder.control(null, [Validators.required]),
        }
      );
    }
  }

  public getPageOperations(): void {
    this.accountService.getAccountOperations(this.accountId, this.page, this.size).subscribe(
      {
        next: (data) => {
          this.pageOperations = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  public searchAccount(): void {
    this.accountId = this.searchFormGroup.value.accountId;
    this.getPageOperations();
  }

  public toPage(index: number) {
    this.page = index;
    this.getPageOperations();
  }

  public doOperation(): void {
    console.log(this.accountId);
    let accountId: string = this.accountId;
    let option: string = this.operationFormGroup.value.option;
    let destAccountId: string = this.operationFormGroup.value.destAccountId;
    let amount: number = this.operationFormGroup.value.amount;
    if (option == 'DEBIT') {
      this.accountService.debit(accountId, amount).subscribe(
        {
          next: () => {
            this.getPageOperations();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }else if (option == 'CREDIT') {
      this.accountService.credit(accountId, amount).subscribe(
        {
          next: () => {
            this.getPageOperations();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }else if (option == 'TRANSFER') {
      this.accountService.transfer(accountId,destAccountId ,amount).subscribe(
        {
          next: () => {
            this.getPageOperations();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }
  }
}
