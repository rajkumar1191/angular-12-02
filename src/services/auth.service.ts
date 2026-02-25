import { Injectable } from '@angular/core';

/**
 * 4. AUTH SERVICE
 * Handles user login status. 
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isAuthenticated = false;
    private _currentUser: string | null = null;

    login(username: string): void {
        this._isAuthenticated = true;
        this._currentUser = username;
        console.log(`[AuthService] User '${username}' logged in.`);
    }

    logout(): void {
        this._isAuthenticated = false;
        this._currentUser = null;
        console.log('[AuthService] User logged out.');
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get currentUser(): string | null {
        return this._currentUser;
    }
}
