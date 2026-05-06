import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // CLEANED: Removed the markdown formatting from the URL string
  private apiUrl = 'https://meraki-frontend-s05n.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  login(password: string): Observable<any> {
    // This will now call https://meraki-backend-l6mx.onrender.com/api/auth/login
    return this.http.post(`${this.apiUrl}/login`, { password });
  }
}