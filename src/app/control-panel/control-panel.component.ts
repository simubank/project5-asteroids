import { ToastrService } from 'ngx-toastr';
import { UserService } from './../services/user.service';
import { User } from './../class/user';
import { LoginService } from './../services/login.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})

// TODO: Move all this to rule management page and do this instead:
// TODO: route to selected child
// TODO: Register child
// TODO: Remove child

export class ControlPanelComponent implements OnInit {

    public _login: Subscription;
    public login: string;
    public usersRules: AngularFireList<any>;
    public _userList: Subscription;
    public userList: any[];
    public newBalance: number;
    public user: User;
    public transactionList: any[];
    public rulesList: any[];

    constructor(private db: AngularFireDatabase,
        private loginService: LoginService,
        private userService: UserService,
        private toastr: ToastrService) { }

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
                        this.rulesList =  Object.keys(this.user.rules);
                    }
                }
            });
        });
    }

    public setBalance(limit: number) {
        this.userService.setBalance(this.user, limit);
        this.newBalance = null;
        setTimeout(() => this.toastr.success("Limit Updated"));
    }
    // TODO: Read user info
    // TODO: Add Rule function
    // TODO: Edit Rule function
    // TODO: Delete Rule function
    // TODO: Change overall allowance limit function


}
