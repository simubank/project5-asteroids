import { User } from './../class/user';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { Subscription } from '../../../node_modules/rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginService } from '../services/login.service';
import { Subject } from 'rxjs/Subject';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../class/transaction';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public userList: User[];
    public _login: Subscription;
    public login: string;
    public user: User;
    public transactionList: any[];

    constructor(private transactionsService: TransactionsService,
        private userService: UserService,
        private loginService: LoginService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        var firebaseList = this.userService.getUsers();
        this._login = this.loginService.getLogin().subscribe(login => {
            this.login = login;
        })
        firebaseList.snapshotChanges().subscribe(user => {
            this.userList = [];
            user.forEach(element => {
                var newUser = element.payload.toJSON();
                newUser["$key"] = element.key;
                this.userList.push(newUser as User);
            })
            this.userList.forEach(user => {
                if (user.fullName === this.login) {
                    this.user = { ...user };
                    if (this.user.transactions !== undefined) {
                        this.transactionList = Object.keys(this.user.transactions);
                    }
                }
            });
        });
        setTimeout(() => this.toastr.success("Great Success"));
    }



    // TODO: function that attempts to make a purchase from a selected vendor with a defined amount
    public makePurchase() {
        let transaction: Transaction = {
            type: 'purchase',
            description: 'coffee',
            amount: 100,
            merchant: 'Tims',
            date: new Date(),
            postBalance: 1000
        }
        this.userService.addTransaction(this.user, transaction);
    }
}
