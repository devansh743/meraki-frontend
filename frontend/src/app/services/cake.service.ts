import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = '[https://meraki-on-wheels.onrender.com/api/cakes](https://meraki-on-wheels.onrender.com/api/cakes)';

  constructor(private http: HttpClient) { }

  getCakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
