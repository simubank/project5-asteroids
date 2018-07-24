import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { User } from './../class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public userName: string;
    // private _usersArray: Subscription;
    // private usersArray: any[];
    public usersArray: AngularFireList<any>;
    public _userList: Subscription;
    public userList: any[];
    public _login: Subscription;
    public login: string;

    constructor(private db: AngularFireDatabase,
        private loginService: LoginService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.usersArray = this.db.list('/users');
        this._userList = this.usersArray.valueChanges().subscribe(users => {
            this.userList = users;
        });

        this._login = this.loginService.getLogin().subscribe(login => {
            this.login = login;
        });

        // TODO: Temporary for testing only
        this.userName = 'Galen Nevius';

        // this.usersArray.push({
        //     id: '5bb31a05-6f70-463d-be17-b96c8a697629_98cbf49e-d46b-49a4-aa1b-c01fe3da3e0e',
        //     fullName: 'Rudi Gjebero',
        //     age: 44,
        //     accountId: '5bb31a05-6f70-463d-be17-b96c8a697629_c1308d8f-3e80-4616-91ee-b79d155a2b25',
        //     balance: 570.71
        // });
    }

    public loginFunction() {
        this.loginService.setLogin(this.userName);
    }

    // public getTestArray(listPath): Observable<any[]> {
    //     let array = this.db.list(listPath).valueChanges();
    //     return array;
    // }

    // Should only be used for hardcoding customers to the database
    // public setCustomer(): void {

    //     let users = this.db.list<User>('users');
    //     this.usersArray.push({
    //         id: '5bb31a05-6f70-463d-be17-b96c8a697629_f19107d0-3995-4006-a42d-fc7dced91fcb',
    //         fullName: 'Frank Berlinski',
    //         age: 34,
    //         accountId: '5bb31a05-6f70-463d-be17-b96c8a697629_854847ff-19a6-4a73-b9e9-54ff823c9824',
    //         balance: 545.8,
    //         transactions: [],
    //         children: []
    //     });
    // }

    // public getCustomers() {
    //     this.apiService.get(Endpoints.SIMULANTS())
    //         .subscribe(data => {
    //             console.log(data);
    //         });
    // }
}
