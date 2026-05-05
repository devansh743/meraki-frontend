import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = 'http://localhost:5000/api/admin';

    constructor(private http: HttpClient) { }

    addCake(cakeData: any) {
        return this.http.post(`${this.apiUrl}/add-cake`, cakeData);
    }

    deleteCake(id: string) {
        return this.http.delete(`${this.apiUrl}/delete-cake/${id}`);
    }
}