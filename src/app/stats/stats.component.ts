import { Component, Input } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  @Input() users: string[];
  
  private transactions: Transaction[];
  private totals: any[];

  constructor(private transactionService: TransactionService) {
    //this.users = new Array<string>();
    console.log('SC: ', this.users);
    this.transactions = new Array<Transaction>();
    this.totals = new Array<any>();
    /*this.transactionService.getUsers().subscribe(data => {
      this.users = data;
      this.totals = this.computeTotalsAmount(this.transactions, this.users);
    });*/
    this.transactionService.transactions.subscribe(data => {
      this.transactions = data;
      this.totals = this.computeTotalsAmount(this.transactions, this.users);
    });
  }

  private computeTotalsAmount(transactions: Transaction[], users: string[]): any[] {
    const totals = [];
    const formatedTotals = [];
    totals['all'] = 0;
    for (const user of users) {
      totals[user] = 0;
    }
    for (const transaction of transactions) {
      totals[transaction.user] += transaction.amount;
      totals['all'] += transaction.amount;
    }
    return totals;
  }

  // return the percent of total transaction of user
  private getPercent(user: string): number {
    let percent = 0;
    if (this.totals['all'] > 0) {
      percent = (this.totals[user] / this.totals['all'] * 100);
    }
    return percent;
  }

  // return requerire rotation for align second donut part
  private getDonutRotation(user: string): string {
    let rotation = 90;
    if (this.isFirstUser(user)) {
      // - 0.2 fix litle shift
      rotation += this.getPercent(user) * 3.6 - 0.2;
    }
    return 'rotate(-' + rotation + 'deg)';
  }

  // return true if user is in first sosition in users array
  private isFirstUser(user: string): boolean {
    return (this.users.indexOf(user) == 0);
  }

}
