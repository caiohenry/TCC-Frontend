
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly httpOptions: any;

  constructor(protected http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  params(params: object) {
    return Object.entries(params)
      .filter((p) => p[1])
      .map((p) => `${p[0]}=${p[1]}`)
      .join('&');
  }
}