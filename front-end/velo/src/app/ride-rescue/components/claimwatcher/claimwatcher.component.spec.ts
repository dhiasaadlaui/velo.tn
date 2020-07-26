import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimwatcherComponent } from './claimwatcher.component';

describe('ClaimwatcherComponent', () => {
  let component: ClaimwatcherComponent;
  let fixture: ComponentFixture<ClaimwatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimwatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimwatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
