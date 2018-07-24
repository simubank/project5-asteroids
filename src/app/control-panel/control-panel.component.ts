import { Rule } from './../class/rule';
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

    public newRuleAllowed: string;
    public newRuleCategory: string;
    public newRuleLimit: number = null;

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
                        this.rulesList = Object.keys(this.user.rules);
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

    createRule() {
        let newRule = new Rule();
        newRule.allowed = (this.newRuleAllowed === 'true' ? true : false);
        newRule.category = this.newRuleCategory;
        if (this.newRuleLimit === null) {
            newRule.limit = 10000;
        } else {
            newRule.limit = this.newRuleLimit;
        }
        this.userService.addRule(this.user, newRule);
        this.newRuleAllowed = null;
        this.newRuleCategory = null;
        this.newRuleLimit = null;
    }

    deleteRule(key: string) {
        this.userService.deleteRule(this.user, key);
    }

    getBgColor(category: string) {
        switch (category) {
            case 'food':
                return 'orange';
            case 'transportation':
                return 'blue';
            case 'clothes':
                return 'pink';
            case 'entertainment':
                return 'purple';
            case 'groceries':
                return 'yellow';
            case 'withdrawal':
                return 'green';
            default:
                return 'white';
        }
    }
    // TODO: Read user info
    // TODO: Add Rule function
    // TODO: Edit Rule function
    // TODO: Delete Rule function
    // TODO: Change overall allowance limit function

}
