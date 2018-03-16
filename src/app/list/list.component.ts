import { Component } from '@angular/core';
import { Transaction } from '../models/transaction';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
    this.transactionService.transactions.subscribe(data => {
      this.transactions = data;
    });
  }

}
