import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTutorial } from './http-tutorial';
import { ApiServiceCore } from '../../core/http/api.service';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

class MockApiServiceCore {
    get(url: string, params?: any) {
        if (url === '/posts') {
            return of([{ id: 1, title: 'Test Post', body: 'Test Body' }]);
        }
        return throwError(() => new Error('Not Found'));
    }
    post(url: string, body: any) {
        return of({ id: 101, ...body });
    }
}

class MockAuthService {
    isAuthenticated = false;
    login(user: string) {
        this.isAuthenticated = true;
    }
    logout() {
        this.isAuthenticated = false;
    }
}

describe('HttpTutorial', () => {
    let component: HttpTutorial;
    let fixture: ComponentFixture<HttpTutorial>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpTutorial],
            providers: [
                { provide: ApiServiceCore, useClass: MockApiServiceCore },
                { provide: AuthService, useClass: MockAuthService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HttpTutorial);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data', () => {
        component.loadData();
        expect(component.loading).toBe(false);
        expect(component.posts().length).toBeGreaterThan(0);
        expect(component.posts()[0].title).toBe('Test Post');
    });

    it('should trigger error response', () => {
        component.triggerErrorResponse();
        expect(component.loading).toBe(false);
        expect(component.errorMsg).toBe('Not Found');
    });

    it('should toggle login status from false to true and back', () => {
        expect(component.authService.isAuthenticated).toBe(false);
        component.toggleLogin();
        expect(component.authService.isAuthenticated).toBe(true);
        component.toggleLogin();
        expect(component.authService.isAuthenticated).toBe(false);
    });
});
