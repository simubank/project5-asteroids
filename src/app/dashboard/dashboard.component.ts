import { User } from './../class/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { LoginService } from '../services/login.service';
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
    public rulesList: any[];

constructor(private userService: UserService,
        private loginService: LoginService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        var firebaseList = this.userService.getUsers();
        this._login = this.loginService.getLogin().subscribe(login => {
            this.login = login;
        });
        firebaseList.snapshotChanges().subscribe(user => {
            this.userList = [];
            user.forEach(element => {
                var newUser = element.payload.toJSON();
                newUser["$key"] = element.key;
                this.userList.push(newUser as User);
            });
            this.userList.forEach(user => {
                if (user.fullName === this.login) {
                    this.user = { ...user };
                    if (this.user.transactions !== undefined) {
                        this.transactionList = Object.keys(this.user.transactions);
                    }
                    if (this.user.rules !== undefined) {
                        this.rulesList = this.user.rules;
                    }
                }
            });
        });
    }



    // TODO: function that attempts to make a purchase from a selected vendor with a defined amount
    public makePurchase(description: string, amount: number, merchant: string, category: string) {
        let transaction: Transaction = {
            description: description,
            amount: amount,
            merchant: merchant,
            date: new Date(),
            postBalance: 1000,
            approved: null,
            category: category
        }
        if (this.userService.checkTransaction(this.user, this.rulesList, transaction)) {
            transaction.approved = true;
            setTimeout(() => this.toastr.success("Transaction Succesfull"));
        } else {
            transaction.approved = false;
            setTimeout(() => this.toastr.error("Transaction Denied"));
        }
        this.userService.addTransaction(this.user, transaction);
    }
}
