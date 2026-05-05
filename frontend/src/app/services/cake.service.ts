import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = 'http://localhost:5000/api/cakes';

  constructor(private http: HttpClient) { }

  getCakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
