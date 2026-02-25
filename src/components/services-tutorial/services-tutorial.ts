import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService, API_BASE_URL } from '../../services/api.service';
import { SharedStateService } from '../../services/shared-state.service';
import { LoggerService } from '../../services/logger.service';

/**
 * Child Component A
 * It PROVIDES its own LoggerService instance.
 */
@Component({
    selector: 'app-service-child-a',
    standalone: true,
    imports: [CommonModule],
    providers: [
        LoggerService // <-- CREATES A NEW INSTANCE OF LOGGER JUST FOR CHILD A
    ],
    template: `
    <div class="child-card child-a">
      <h4>Child A (Has Own Logger Instance)</h4>
      <p>Logger Instance ID: <strong>{{ logger.instanceId }}</strong></p>
      <button class="btn btn-sm btn-outline" (click)="logHello()">Log 'Hello A'</button>
      <ul>
        <li *ngFor="let msg of logger.messages">{{ msg }}</li>
      </ul>
      <p class="mt-2">Shared State Value: <strong>{{ (sharedState.notificationCount$ | async) }}</strong></p>
    </div>
  `
})
export class ServiceChildA {
    constructor(public logger: LoggerService, public sharedState: SharedStateService) { }
    logHello() {
        this.logger.log('Hello from Child A');
    }
}

/**
 * Child Component B
 * It ALSO provides its own LoggerService instance.
 */
@Component({
    selector: 'app-service-child-b',
    standalone: true,
    imports: [CommonModule],
    providers: [
        LoggerService // <-- CREATES ANOTHER NEW INSTANCE JUST FOR CHILD B
    ],
    template: `
    <div class="child-card child-b">
      <h4>Child B (Has Own Logger Instance)</h4>
      <p>Logger Instance ID: <strong>{{ logger.instanceId }}</strong></p>
      <button class="btn btn-sm btn-outline" (click)="logHello()">Log 'Hello B'</button>
      <ul>
        <li *ngFor="let msg of logger.messages">{{ msg }}</li>
      </ul>
      <p class="mt-2">Shared State Value: <strong>{{ (sharedState.notificationCount$ | async) }}</strong></p>
    </div>
  `
})
export class ServiceChildB {
    constructor(public logger: LoggerService, public sharedState: SharedStateService) { }
    logHello() {
        this.logger.log('Hello from Child B');
    }
}

/**
 * Main Services Tutorial Component
 */
@Component({
    selector: 'app-services-tutorial',
    standalone: true,
    imports: [CommonModule, FormsModule, ServiceChildA, ServiceChildB],
    // We can provide InjectionTokens here (or in main config)
    providers: [
        { provide: API_BASE_URL, useValue: 'https://jsonplaceholder.typicode.com/' }
    ],
    templateUrl: './services-tutorial.html',
    styleUrl: './services-tutorial.css'
})
export class ServicesTutorial implements OnInit {

    // Expose services to the template by making them public (or mapping them to properties)
    usernameInput = '';
    fetchedUsers: any[] = [];
    fetching = false;

    constructor(
        public authService: AuthService,
        public apiService: ApiService,
        public sharedState: SharedStateService,
        @Inject(API_BASE_URL) public configUrl: string // Injecting an InjectionToken
    ) { }

    ngOnInit(): void {
        console.log('Services Tutorial initialized. Base URL:', this.configUrl);
    }

    // --- Auth Service Logic ---
    handleLogin() {
        if (this.usernameInput.trim()) {
            this.authService.login(this.usernameInput);
            this.usernameInput = '';
        }
    }

    handleLogout() {
        this.authService.logout();
    }

    // --- API Service Logic ---
    loadUsers() {
        this.fetching = true;
        this.fetchedUsers = [];
        this.apiService.getUsers().subscribe({
            next: (users) => {
                this.fetchedUsers = users;
                this.fetching = false;
            },
            error: () => this.fetching = false
        });
    }

    // --- Shared State Logic ---
    incrementCounter() {
        this.sharedState.incrementValue();
    }

    resetCounter() {
        this.sharedState.reset();
    }
}
