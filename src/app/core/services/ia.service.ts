import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IAService {
  private baseUrl = environment.api;
  private apiUrl = `${this.baseUrl}/ia/image/`;

  constructor(private http: HttpClient) {}

  postIAImage(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }
}