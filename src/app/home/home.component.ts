import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    testArray: Observable<any[]>;
    constructor(private db: AngularFireDatabase) { }

    ngOnInit() {
        this.testArray = this.getTestArray('/testArray');
    }

    getTestArray(listPath): Observable<any[]> {
        let array = this.db.list(listPath).valueChanges();
        return array;
    }

}
