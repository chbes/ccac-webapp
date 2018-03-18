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

  constructor(private transactionService: TransactionService) {
    this.emitterUsers = new EventEmitter<string[]>();
    this.emitterTransactions = new EventEmitter<Transaction[]>();
    
    this.users = Array<string>();
    this.transactions = Array<Transaction>();
    
    this.transactionService.getUsers().subscribe(data => {
      //TODO Start loader
      this.users = data;
      this.emitterUsers.emit(this.users);
    }, (error) => {
      //TODO Show error message
    }, () => {
      //TODO Stop loader
    });

    this.transactionService.transactions.subscribe(data => {
      //TODO Start loader
      this.transactions = data;
      this.emitterTransactions.emit(this.transactions);
    }, (error) => {
      //TODO Show error message
    }, () => {
      //TODO Stop loader
    });
  }

}
