import { Routes } from '@angular/router';
import { RouteHomeComponent } from '../components/routing-demo/home';
import { authGuard } from '../guards/auth.guard';

// We can lazy load or directly import. Let's demonstrate both standard and lazy loaded routes
export const routes: Routes = [
  // 1. Standard Eagerly Loaded Route
  { path: 'home', component: RouteHomeComponent },

  // Tutorial Routes
  {
    path: 'ngrx-tutorial',
    loadComponent: () => import('../components/ngrx-tutorial/ngrx-tutorial').then(c => c.NgrxTutorial)
  },

  // 2. Auth Guard Protected Route + Parameterized Route
  {
    path: 'dashboard/:id',
    // Lazy loaded component (v17+ syntax)
    loadComponent: () =>
      import('../components/routing-demo/dashboard').then((m) => m.RouteDashboardComponent),
    canActivate: [authGuard],
  },

  // 3. Admin Protected Route (Using route data to pass role info to guard)
  {
    path: 'admin',
    loadComponent: () =>
      import('../components/routing-demo/admin').then((m) => m.RouteAdminComponent),
    canActivate: [authGuard],
    data: { requiresAdmin: true },
  },
];

/*
Angular Route Guards:   
    canLoad - This guard is used to prevent the entire module from being loaded if the user doesn't have access.
    canActivate - This guard is used to prevent navigation to a route if the user doesn't have access, but the module will still be loaded.
    canActivateChild - This guard is used to prevent navigation to child routes if the user doesn't have access.
    canDeactivate - This guard is used to prevent navigation away from a route if there are unsaved changes or other conditions that should block leaving the page.

*/
