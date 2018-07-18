import { AngularFireDatabase } from 'angularfire2/database';
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
    private _usersArray: Subscription;
    private usersArray: any[];

    constructor(private db: AngularFireDatabase,
        private loginService: LoginService
    ) {
        this._usersArray = this.db.list('/users').valueChanges().subscribe(usersArray => {
            this.usersArray = usersArray;
        })
    }

    ngOnInit() { }

    public loginFunction() {
        this.loginService.setLogin(this.userName);
    }

    // public getTestArray(listPath): Observable<any[]> {
    //     let array = this.db.list(listPath).valueChanges();
    //     return array;
    // }

    // Should only be used for hardcoding customers to the database
    // public setCustomer(): void {
    //     let user: User = {
    //         id: '5bb31a05-6f70-463d-be17-b96c8a697629_e2ba9727-a181-48f6-a1bc-0abf5ce173a2',
    //         fullName: 'Ivana Easom',
    //         age: 38,
    //         accountId: '5bb31a05-6f70-463d-be17-b96c8a697629_29c00b50-3460-45c5-8d22-ea8ab0fe9d19',
    //         balance: 16.11,
    //         transactions: null,
    //         children: null
    //     };

    //     let users = this.db.list<User>('users');
    //     users.push(user);
    // }

    // public getCustomers() {
    //     this.apiService.get(Endpoints.SIMULANTS())
    //         .subscribe(data => {
    //             console.log(data);
    //         });
    // }
}
