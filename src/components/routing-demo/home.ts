import { Component } from '@angular/core';

@Component({
    selector: 'app-route-home',
    standalone: true,
    template: `
    <div class="route-box home-box">
      <h3>Home Route</h3>
      <p>This is a public, unprotected route. Anyone can view this!</p>
    </div>
  `,
    styles: [`
    .route-box { padding: 30px; border-radius: 8px; margin-top: 20px; text-align: center; }
    .home-box { background: #e6fffa; border: 2px dashed #319795; color: #285e61; }
  `]
})
export class RouteHomeComponent { }
