import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            this.router.navigate(['/login']); // Send them back to login if not authorized
            return false;
        }
        return true;
    }
}