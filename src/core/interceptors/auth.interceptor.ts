import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

/**
 * Functional Auth Interceptor (Angular v15+)
 * Intercepts outgoing HTTP requests and appends an Authorization header 
 * if the user is authenticated.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); // Natively inject services

    console.log(`[Auth Interceptor] Intercepting request to ${req.url}`);

    if (authService.isAuthenticated) {
        // Clone the request and add the auth header
        // In a real app, you'd append a JWT token (e.g., Bearer XXX)
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer mock-token-for-${authService.currentUser}`
            }
        });

        return next(clonedRequest);
    }

    // If not authenticated, just pass the original request
    return next(req);
};
