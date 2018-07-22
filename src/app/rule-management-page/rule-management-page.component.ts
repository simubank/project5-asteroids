import { User } from './../class/user';
import { LoginService } from './../services/login.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-rule-management-page',
    templateUrl: './rule-management-page.component.html',
    styleUrls: ['./rule-management-page.component.scss']
})
export class RuleManagementPageComponent implements OnInit {
    public _login: Subscription;
    public login: string;

    public usersRules: AngularFireList<any>;
    public _userList: Subscription;
    public userList: any[];

    public user: User;
    public transactionList: any[];
    public rulesList: any[];

    constructor(private db: AngularFireDatabase,
        private loginService: LoginService,
        private userService: UserService) { }

    ngOnInit() {
        this._login = this.loginService.getLogin().subscribe(login => {
            this.login = login;
        });

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
            })
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

    // TODO: Read user info
    // TODO: Add Rule function
    // TODO: Edit Rule function
    // TODO: Delete Rule function
    // TODO: Change overall allowance limit function
}
