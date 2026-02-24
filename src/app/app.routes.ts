import { Routes } from '@angular/router';
// import { RouteHomeComponent } from './components/routing-demo/home';
// import { authGuard } from './guards/auth.guard';

// // We can lazy load or directly import. Let's demonstrate both standard and lazy loaded routes
export const routes: Routes = [
//     // 1. Standard Eagerly Loaded Route
//     { path: 'home', component: RouteHomeComponent },

//     // 2. Auth Guard Protected Route + Parameterized Route
//     {
//         path: 'dashboard/:id',
//         // Lazy loaded component (v17+ syntax)
//         loadComponent: () => import('./components/routing-demo/dashboard').then(m => m.RouteDashboardComponent),
//         canActivate: [authGuard]
//     },

//     // 3. Admin Protected Route (Using route data to pass role info to guard)
//     {
//         path: 'admin',
//         loadComponent: () => import('./components/routing-demo/admin').then(m => m.RouteAdminComponent),
//         canActivate: [authGuard],
//         data: { requiresAdmin: true }
//     }
];
