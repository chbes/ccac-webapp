import { Component, Output, EventEmitter } from '@angular/core';
import { Transaction } from './models/transaction';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @Output() emitterUsers: EventEmitter<string[]>;
  @Output() emitterTransactions: EventEmitter<Transaction[]>;

  private users: string[];
  private transactions: Transaction[];

  public usersLoader: boolean;
  public transactionsLoader: boolean;

  constructor(private transactionService: TransactionService) {
    this.usersLoader = true;
    this.transactionsLoader = true;

    this.emitterUsers = new EventEmitter<string[]>();
    this.emitterTransactions = new EventEmitter<Transaction[]>();
    
    this.users = Array<string>();
    this.transactions = Array<Transaction>();
    
    this.transactionService.getUsers().subscribe(data => {
      // Start loader
      this.users = data;
      this.emitterUsers.emit(this.users);
    }, (error) => {
      // TODO Show error message
    }, () => {
      // Stop loader
      this.usersLoader = false;
    });

    this.transactionService.transactions.subscribe(data => {
      // Start loader
      this.transactions = data;
      this.emitterTransactions.emit(this.transactions);
    }, (error) => {
      // TODO Show error message
    }, () => {
      // Stop loader
      this.transactionsLoader = false;
    });
  }

}
