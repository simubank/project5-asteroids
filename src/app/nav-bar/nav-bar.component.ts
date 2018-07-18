import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    public goTo(route: string) {
        this.router.navigate([route]);
    }
}
