import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxTutorial } from './ngrx-tutorial';

describe('NgrxTutorial', () => {
  let component: NgrxTutorial;
  let fixture: ComponentFixture<NgrxTutorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxTutorial]
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
