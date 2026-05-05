import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = '[https://meraki-backend-l6mx.onrender.com/api](https://meraki-backend-l6mx.onrender.com/api)';
  constructor(private http: HttpClient) { }

  getCakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
