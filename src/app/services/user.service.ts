import { Transaction } from './../class/transaction';
import { User } from './../class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    userList: AngularFireList<any>;
    selectedUser: User = new User();

    constructor(private db: AngularFireDatabase) {
        this.userList = this.db.list('/users');
    }

    getUsers() {
        return this.userList;
    }

    updateUser(user: User) {
        this.userList.update(user.$key, {
            id: user.id,
            fullName: user.fullName,
            age: user.age,
            accountId: user.accountId,
            balance: user.balance,
            transactions: user.transactions
            // children: user.children
        });
    }

    addTransaction(user: User, transaction: Transaction) {
       let transactionList = this.db.list('/users/' + user.$key +  '/transactions');
       transactionList.push(transaction);
    }
}
