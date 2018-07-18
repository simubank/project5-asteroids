import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    // TODO: function that attempts to make a purchase from a selected vendor with a defined amount
    public makePurchase(vendor: string, value: number) {

    }

}
