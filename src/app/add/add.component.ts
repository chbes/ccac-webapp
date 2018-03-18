import { Component, Input } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  
  @Input() users: string[];

  private newTransaction: Transaction;
  private formValidation = false;

  constructor(private transactionService: TransactionService) {
    this.newTransaction = new Transaction();
    this.users = new Array<string>();
  }

  addTransaction(newTransaction) {
    this.transactionService.createTransactions(newTransaction).subscribe(data => {
      this.newTransaction = new Transaction();
    }, err => {
      console.log(err);
    });
  }

  stringToDate(newDate: string): Date {
    return new Date(newDate);
  }

  todayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  checkValidation() {
    this.formValidation =
    (  this.userValid(this.newTransaction.user)
    && this.amountValid(this.newTransaction.amount)
    && this.dateValid(this.newTransaction.date)
    );
  }

  userValid(user: string): boolean {
    return this.users.includes(user);
  }

  amountValid(amount: number): boolean {
    return Number.isInteger(amount) && amount > 0;
  }

  dateValid(date: Date): boolean {
    const dateString = date.toISOString().split('T')[0];
    return ( (/[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(dateString) && (dateString <= new Date().toISOString().split('T')[0]) );
  }

}
