import { Endpoints } from './../common/endpoints';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    testArray: Observable<any[]>;
    constructor(private db: AngularFireDatabase,
        private apiService: ApiService) { }

    ngOnInit() {
        this.testArray = this.getTestArray('/testArray');
    }

    public getTestArray(listPath): Observable<any[]> {
        let array = this.db.list(listPath).valueChanges();
        return array;
    }

    public getCustomers() {
        this.apiService.get(Endpoints.SIMULANTS())
        .subscribe(data => {
            console.log(data);
        });
    }
}
