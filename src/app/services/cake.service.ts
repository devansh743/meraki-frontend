import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  // Update this to your ACTUAL live Render URL
  private apiUrl = 'https://meraki-frontend-s05n.onrender.com/api/cakes';

  constructor(private http: HttpClient) { }

  getCakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}