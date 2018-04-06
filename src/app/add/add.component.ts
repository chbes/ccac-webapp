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

  public newTransaction: Transaction;
  public formValidation: boolean;
  public loader: boolean;

  constructor(private transactionService: TransactionService) {
    this.newTransaction = new Transaction();
    this.formValidation = false;
    this.loader = false;
  }

  addTransaction(newTransaction) {
    // Start loader
    this.loader = true;
    this.transactionService.createTransactions(newTransaction).subscribe(data => {
      this.newTransaction = new Transaction();
    }, (error) => {
      // TODO Show error message
    }, () => {
      // Stop loader
      this.loader = false;
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
      (this.userValid(this.newTransaction.user)
        && this.amountValid(this.newTransaction.amount)
        && this.dateValid(this.newTransaction.date)
      );
    console.log("T: ", this.newTransaction);
  }

  userValid(user: string): boolean {
    return this.users.includes(user);
  }

  amountValid(amount: number): boolean {
    return Number.isInteger(amount) && amount > 0;
  }

  dateValid(date: Date): boolean {
    const dateString = date.toISOString().split('T')[0];
    return ((/[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(dateString) && (dateString <= new Date().toISOString().split('T')[0]));
  }

}
