import { AngularFireDatabase } from 'angularfire2/database';
import { Endpoints } from './../common/endpoints';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from '../../../node_modules/rxjs';

@Injectable()
export class TransactionsService {
    private _transactions = new BehaviorSubject<string>(null);
    private _usersArray: Subscription;
    private usersArray: any[];

    constructor(private apiService: ApiService,
        private db: AngularFireDatabase) {
        this._usersArray = this.db.list('/users').valueChanges().subscribe(usersArray => {
            this.usersArray = usersArray;
        })
    }

    public getTransactions(): any {
        return this._transactions.asObservable();
    }

    public getAllTransactions(accountId: string): any {
        this._transactions = this.apiService.get(Endpoints.TRANSACTIONS());

    }
}
