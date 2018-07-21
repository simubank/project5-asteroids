import { Transaction } from './../class/transaction';
import { User } from './../class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Rule } from '../class/rule';

@Injectable()
export class UserService {
    userList: AngularFireList<any>;



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
        let transactionList = this.db.list('/users/' + user.$key + '/transactions');
        transactionList.push(transaction);
        // let rulesList = this.db.list('/users/' + user.$key + '/rules');
        // rulesList.push({
        //     category: 'globalLimit',
        //     allowed: true,
        //     limit: 1000,
        //     resetDate: new Date(),
        //     resetValue: new Date()
        // });
    }

    checkTransaction(rulesList: Rule[], transaction: Transaction) {
        let approved = true;
        if (rulesList !== undefined) {
            Object.keys(rulesList).forEach(function(key) {
                if (rulesList[key].category === transaction.category || rulesList[key].category === 'globalLimit') {
                    if (rulesList[key].allowed) {
                        if (rulesList[key].limit < transaction.amount) {
                            approved = false;
                        }
                    } else {
                        approved = false;
                    }
                }
            });
        }


        return approved;
    }

    addRule(user: User, rule: Rule) {
        let rulesList = this.db.list('/users/' + user.$key + '/rules');
        rulesList.push(rule);
    }

    // TODO: Create delete rule service, usind method .remove
    deleteRule(user: User, rule: Rule) {

    }
}
