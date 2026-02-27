import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-route-dashboard',
    standalone: true,
    template: `
    <div class="route-box dash-box">
      <h3>📊 User Dashboard</h3>
      <p>This route is <strong>Protected by AuthGuard</strong>!</p>
      
      <!-- Demonstrating Route Parameters -->
      <div *ngIf="userId" class="param-box mt-3">
        Loaded profile for User ID: <strong>{{ userId }}</strong>
      </div>
    </div>
  `,
    styles: [`
    .route-box { padding: 30px; border-radius: 8px; margin-top: 20px; text-align: center; }
    .dash-box { background: #ebf8ff; border: 2px dashed #3182ce; color: #2b6cb0; }
    .param-box { display: inline-block; padding: 10px 20px; background: white; border-radius: 20px; color: #dd6b20; font-weight: bold;}
    .mt-3 { margin-top: 20px; }
  `]
})
export class RouteDashboardComponent implements OnInit {
    userId: string | null = null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // Reading dynamic parameter from route: e.g /dashboard/123
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
        });
    }
}
