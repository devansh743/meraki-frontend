import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '[https://meraki-on-wheels.onrender.com/api](https://meraki-on-wheels.onrender.com/api)';

  constructor(private http: HttpClient) { }

  login(password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { password });
  }
}
