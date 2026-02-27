import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-routing-tutorial',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive], // Must import RouterLink modules for routing
    templateUrl: './routing-tutorial.html',
    styleUrl: './routing-tutorial.css'
})
export class RoutingTutorial {

    constructor(public authService: AuthService) { }

    loginAsUser() {
        this.authService.login('johndoe');
    }

    loginAsAdmin() {
        this.authService.login('admin');
    }

    logout() {
        this.authService.logout();
    }
}
