import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';


const mockActivatedRoute = {};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideMockStore({
          initialState: {
            counter: {
              count: 0,
              loading: false,
              error: null
            }
          }
        }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute } 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular app new');
  });
});
