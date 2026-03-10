import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { NgrxTutorial } from './ngrx-tutorial';
import { count } from 'rxjs';

describe('NgrxTutorial', () => {
  let component: NgrxTutorial;
  let fixture: ComponentFixture<NgrxTutorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxTutorial],
      providers: [
        provideMockStore({
          initialState: {
            counter: {
              count: 0,
              loading: false,
              error: null
            }
          }
        })    
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxTutorial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
