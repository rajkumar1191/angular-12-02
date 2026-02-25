import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

// ==========================================
// 1. INJECTION TOKENS & ENVIRONMENT CONFIG
// ==========================================
// A token for providing an API Base URL, often set in providers array in main.ts or a module
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

// ==========================================
// 2. API SERVICE (Provided In Root)
// ==========================================
@Injectable({
    // providedIn: 'root' makes it a Singleton across the whole app
    providedIn: 'root'
})
export class ApiService {

    // Real world example injecting HttpClient 
    // (Assuming provideHttpClient() is added in main config)
    constructor(private http: HttpClient) { }

    // Simulated API Call
    // Real world: return this.http.get<any[]>(`${this.baseUrl}/users`);
    getUsers(): Observable<any[]> {

        console.log('[ApiService] Fetching users...');
        const dummyData = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ];
        // Simulating network delay
        return of(dummyData);
    }
}
