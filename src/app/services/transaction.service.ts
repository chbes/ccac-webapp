import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Transaction } from '../models/transaction';
import { WebsocketService } from './websocket.service';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const WEBSOCKET_URL = 'ws://' + API_URL + '/ws';
const TRANSACTIONS_URL = 'http://' + API_URL + '/transactions';
const USERS_URL = 'http://' + API_URL + '/users';

@Injectable()
export class TransactionService {

  public transactions: Subject<Transaction[]>;
  private users: Observable<string[]>;

  constructor(private http: Http, wsService: WebsocketService) {
    // Receive transactions after connect to WebSocket API
    this.transactions = <Subject<Transaction[]>>wsService
      .connect(WEBSOCKET_URL)
      .map((response: MessageEvent): Transaction[] => JSON.parse(response.data));
  }

  createTransactions(newTransaction: Transaction): Observable<Transaction> {
    const body = JSON.stringify(newTransaction);
    return this.http.post(TRANSACTIONS_URL, body)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getUsers(): Observable<string[]> {
    return this.http.get(USERS_URL)
      .map((response): string[] => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
