import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    testArray: Observable<any[]>;
    constructor(private db: AngularFireDatabase,
        public http: HttpClient) { }

    ngOnInit() {
        this.testArray = this.getTestArray('/testArray');
    }

    public getTestArray(listPath): Observable<any[]> {
        let array = this.db.list(listPath).valueChanges();
        return array;
    }

    public getCustomers() {
        const authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzc3MiIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiNWJiMzFhMDUtNmY3MC00NjNkLWJlMTctYjk2YzhhNjk3NjI5In0.wfXq75stYG7Hr3aAtIrplbQo6fyf8Kw8Xxp0196jY5g";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': authorization
            })
        };
        this.http.get('/api/' + 'simulants', httpOptions).subscribe(data => {
            console.log(data);
        });
    }
}
