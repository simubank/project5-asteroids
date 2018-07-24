import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    public _login: Subscription;
    public login: string;
    public hideNavbar: boolean = true;
    constructor(private router: Router,
        private loginService: LoginService) { }

    ngOnInit() {
        this._login = this.loginService.getLogin().subscribe(login => {
            this.login = login;
            if (login !== null) {
                this.router.navigate(['control-panel']);
                this.hideNavbar = false;
            } else {
                this.router.navigate(['']);
            }
        })

    }

    public goTo(route: string) {
        this.router.navigate([route]);
    }

    public logout() {
        this.loginService.logOut();
        this.hideNavbar = true;
    }
}
