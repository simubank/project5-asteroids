import { TransactionsService } from './transactions.service';
import { Transaction } from './../class/transaction';
import { User } from './../class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Rule } from '../class/rule';

@Injectable()
export class UserService {
    userList: AngularFireList<any>;



    constructor(private db: AngularFireDatabase,
    private transactionsService: TransactionsService) {
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
        if (transaction.approved) {
            this.transactionsService.makeTransaction(user.accountId, transaction.amount, transaction.merchant, transaction.category);
        }
        // let rulesList = this.db.list('/users/' + user.$key + '/rules');
        // rulesList.push({
        //     category: 'coffee',
        //     allowed: true,
        //     limit: 1000,
        //     resetDate: new Date(),
        //     resetValue: new Date()
        // });
    }

    checkTransaction(user: User, rulesList: Rule[], transaction: Transaction) {
        // TODO: Implement logic that decreases the limit of the selected category and global limit
        // TODO: Implement -1 limit logic for no limits
        let approved = true;
        let newCategoryLimit: number;
        let ruleKey: string;
        let rule: Rule;
        let categorized: boolean = false;
        if (rulesList !== undefined) {
            Object.keys(rulesList).forEach(function(key) {
                if (user.balance < transaction.amount) {
                    approved = false;
                }
                if (rulesList[key].category === transaction.category) {
                    categorized = true;
                    if (rulesList[key].allowed) {
                        if (rulesList[key].limit < transaction.amount) {
                            approved = false;
                        }
                        else {
                            newCategoryLimit = rulesList[key].limit - transaction.amount;
                            ruleKey = key;
                            rule = rulesList[key];
                        }
                    } else {
                        approved = false;
                    }
                }
            });
        }
        if (approved) {
            this.updateBalance(user, transaction.amount);
            if (categorized) {
                this.updateCategoryLimit(user, rule, ruleKey, newCategoryLimit);
            }
        }

        return approved;
    }

    addRule(user: User, rule: Rule) {
        let rulesList = this.db.list('/users/' + user.$key + '/rules');
        rulesList.push(rule);
    }

    deleteRule(user: User, key: string) {
        let rulePath = this.db.list('/users/' + user.$key + '/rules');
        rulePath.remove(key);
    }

    setBalance (user: User, balance: number) {
        this.userList.update(user.$key, {
            balance: balance
        })
    }

    updateBalance (user: User, value: number) {
        let newBalance = user.balance - value;
        this.userList.update(user.$key, {
            balance: newBalance,
        })
    }

    updateCategoryLimit(user: User, rule: Rule, $key: string, newLimit: number) {
        this.userList.update(user.$key + '/rules/' + $key, {
            limit: newLimit,
            category: rule.category,
            allowed: rule.allowed
        });
    }
}
