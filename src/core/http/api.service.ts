import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * A standardized ApiService wrap over HttpClient.
 * Promotes consistent configuration, base URLs, and options across the app.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiServiceCore {
    private http = inject(HttpClient);

    // Base URL (Mocking JSONPlaceholder for real-world simulation)
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    /**
     * Standardized GET request
     */
    get<T>(endpoint: string, params?: any): Observable<T> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }

        return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
    }

    /**
     * Standardized POST request
     */
    post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
    }

    /**
     * Standardized PUT request
     */
    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
    }

    /**
     * Standardized DELETE request
     */
    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
    }
}
