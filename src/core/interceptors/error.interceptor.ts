import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Functional Error Interceptor
 * Standardizes error handling and response logging across the entire application.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred!';

            // Determine error type
            if (error.error instanceof ErrorEvent) {
                // Client-side or network error
                errorMessage = `Client Error: ${error.error.message}`;
            } else {
                // Backend error response
                errorMessage = `Server Error [${error.status}]: ${error.message}`;

                // Handle specific status codes
                if (error.status === 401) {
                    errorMessage = 'Unauthorized access. Please log in.';
                    // e.g. inject(Router).navigate(['/login']);
                } else if (error.status === 404) {
                    errorMessage = 'The requested resource was not found.';
                }
            }

            console.error('[Error Interceptor] Caught:', errorMessage);

            // Pass the error back up the chain so components can handle it individually if needed
            return throwError(() => new Error(errorMessage));
        })
    );
};
