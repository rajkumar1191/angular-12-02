import { Component } from '@angular/core';

@Component({
    selector: 'app-route-admin',
    standalone: true,
    template: `
    <div class="route-box admin-box">
      <h3>🛡️ Admin Panel</h3>
      <p>This route requires <strong>Strict Admin Privileges</strong>!</p>
      <p>You bypassed the authGuard utilizing the 'requiresAdmin' data token successfully.</p>
    </div>
  `,
    styles: [`
    .route-box { padding: 30px; border-radius: 8px; margin-top: 20px; text-align: center; }
    .admin-box { background: #fff5f5; border: 2px dashed #e53e3e; color: #c53030; }
  `]
})
export class RouteAdminComponent { }
