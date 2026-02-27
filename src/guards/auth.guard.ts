import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional Route Guard (Angular v15+)
 * Traditional class-based guards (implements CanActivate) are deprecated.
 * We now use simple functions and `inject()` to get dependencies.
 */
export const authGuard: CanActivateFn = (route, state) => {
    // Injecting the required services natively without a constructor
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if the user is authenticated
    if (authService.isAuthenticated) {
        // If Admin route, verify admin credentials (mocking logic here)
        const requiresAdmin = route.data['requiresAdmin'] || false;

        if (requiresAdmin && authService.currentUser !== 'admin') {
            alert('Access Denied: You must be logged in as "admin" to view this page!');
            return false; // Prevent navigation
        }

        return true; // Allow navigation
    }

    // Not logged in -> Redirect to home (or a dedicated login page)
    alert('Access Denied: You must be logged in to view the Dashboard!');
    router.navigate(['/']); // Redirecting to home or login page
    return false;
};
