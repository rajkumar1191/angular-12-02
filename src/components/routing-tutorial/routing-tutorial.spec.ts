import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutingTutorial } from './routing-tutorial';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

class MockAuthService {
    login(user: string) { }
    logout() { }
}

const mockActivatedRoute = {};

describe('RoutingTutorial', () => {
    let component: RoutingTutorial;
    let fixture: ComponentFixture<RoutingTutorial>;
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoutingTutorial],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RoutingTutorial);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call login when loginAsUser is called', () => {
        let spy = vi.spyOn(authService, 'login');
        component.loginAsUser();
        expect(spy).toHaveBeenCalledWith('johndoe');
    });

    it('should call login when loginAsAdmin is called', () => {
        let spy = vi.spyOn(authService, 'login');
        component.loginAsAdmin();
        expect(spy).toHaveBeenCalledWith('admin');
    });

    it('should call logout when logout is called', () => {
        let spy = vi.spyOn(authService, 'logout');
        component.logout();
        expect(spy).toHaveBeenCalled();
    });
});
