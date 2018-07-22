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

        // this.usersArray.push({
        //     id: '5bb31a05-6f70-463d-be17-b96c8a697629_6c8434d3-9d00-45d9-83d6-5c87cc97cdd8',
        //     fullName: 'Galen Nevius',
        //     age: 49,
        //     accountId: '5bb31a05-6f70-463d-be17-b96c8a697629_27ccd2e1-adc7-4902-8cd0-b4baa8558480',
        //     balance: 709.39,
        //     transactions: [{
        //         type: 'purchase',
        //         description: 'coffee',
        //         amount: 100,
        //         merchant: 'Tims',
        //         date: new Date(),
        //         postBalance: 1000
        //     }],
        //     children: []
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
