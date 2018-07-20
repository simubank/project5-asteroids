import { TransactionsService } from './transactions.service';
import { User } from './../class/user';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from '../../../node_modules/rxjs';

@Injectable()
export class LoginService {
    private _login = new BehaviorSubject<string>(null);
    private _usersArray: Subscription;
    private usersArray: any[];



    constructor(private db: AngularFireDatabase) {
        this._login.next(null);
        this._usersArray = this.db.list('/users').valueChanges().subscribe(usersArray => {
            this.usersArray = usersArray;
        })
    }

    public getLogin(): any {
        return this._login.asObservable();
    }

    public setLogin(login: string): boolean {
        // TODO: Maybe switch to username instead of fullname
        this.usersArray.forEach(user => {
            if (login === user.fullName) {
                this._login.next(login);
                return true;
            }
        });
        return false;

    }

    public logOut() {
        this._login.next(null);
    }
}
