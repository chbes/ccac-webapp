import { Component, Output, EventEmitter } from '@angular/core';
import { Transaction } from './models/transaction';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @Output() changeUsers: EventEmitter<string[]>;

  private users: string[];

  constructor(private transactionService: TransactionService) {
    this.changeUsers = new EventEmitter<string[]>();
    this.users = Array<string>();
    console.log('& Start');
    this.transactionService.getUsers().subscribe(data => {
      console.log('& Data: ', data);
      this.users = data;
      this.changeUsers.emit(this.users);
    }, (error) => {
      console.error('& ',error);
    }, () => {
      console.log('& done!');
    });
  }

}
