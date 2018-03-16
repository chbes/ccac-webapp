import { Component } from '@angular/core';
import { Transaction } from './models/transaction';
import { TransactionService } from './services/transaction.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private transactionService: TransactionService) {
    console.log('& Start');
    this.transactionService.loadUsers().subscribe(data => {
      console.log('& Data: ', data);
    }, (error) => {
      console.error('& ',error);
    }, () => {
      console.log('& done!');
    });
  }

}
