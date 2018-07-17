import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {
    base: string;

    constructor(private http: Http) { }

    public get(url: string): any {
        return this.http.get(url, {headers: this.getHeaders() })
            .map((res: Response) => res.json());
    }

    private getHeaders(): Headers {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzc3MiIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiNWJiMzFhMDUtNmY3MC00NjNkLWJlMTctYjk2YzhhNjk3NjI5In0.wfXq75stYG7Hr3aAtIrplbQo6fyf8Kw8Xxp0196jY5g');
        return headers;
    }

}
