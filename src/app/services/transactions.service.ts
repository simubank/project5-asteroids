import { Endpoints } from './../common/endpoints';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from '../../../node_modules/rxjs';

@Injectable()
export class TransactionsService {

    constructor(private apiService: ApiService) {
    }

    public makeTransaction(accountID: string, amount: number, merchantName: string, type: string) {
        var date = new Date();
        date.setMinutes (date.getMinutes() + 1 );
        let stringDate = date.toISOString();
        stringDate = stringDate.substring(0, stringDate.length - 1);
        let newTransaction = [{
            "accountId": accountID,
            "categoryTags": [
                "string"
            ],
            "currencyAmount": amount,
            "description": type,
            "locationCity": '',
            "locationCountry": '',
            "locationLatitude": 0,
            "locationLongitude": 0,
            "locationPostalCode": '',
            "locationRegion": '',
            "locationStreet": '',
            "merchantName": merchantName,
            "postDate": stringDate,
            "source": null,
            "type": "DepositAccountTransaction"
        }];
        this.apiService.post(Endpoints.SIMULANTS() + '/' + accountID + '/simulatedtransactions', newTransaction).subscribe(response => console.log(response));
    }
}
