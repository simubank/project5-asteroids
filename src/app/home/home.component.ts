import { User } from './../interface/user';
import { Endpoints } from './../common/endpoints';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    usersArray: Observable<any[]>;
    userName: string;
    public basePath: string = '/users';
    public users: AngularFireList<User[]>;
    // public user: AngularFireObject<User> = null;


    constructor(private db: AngularFireDatabase,
        private apiService: ApiService) {
            this.users = db.list('/users');
        }

    ngOnInit() {
        // this.usersArray = this.getTestArray('/testArray');
        // let array = this.db.list('/users').valueChanges();

        // this.testArray = this.getTestArray('/testArray');
    }

    public getTestArray(listPath): Observable<any[]> {
        let array = this.db.list(listPath).valueChanges();
        return array;
    }

    public setCustomer(): void {
        let user: User = {
            id: '5bb31a05-6f70-463d-be17-b96c8a697629_6c8434d3-9d00-45d9-83d6-5c87cc97cdd8',
            fullName: 'Galen Nevius',
            age: 49,
            accountId: '5bb31a05-6f70-463d-be17-b96c8a697629_27ccd2e1-adc7-4902-8cd0-b4baa8558480',
            balance: 709.39,
            transactions: null,
            children: null
        };

        this.users.push(user);
    }

    public getCustomers() {
        this.apiService.get(Endpoints.SIMULANTS())
            .subscribe(data => {
                console.log(data);
            });
    }
}
