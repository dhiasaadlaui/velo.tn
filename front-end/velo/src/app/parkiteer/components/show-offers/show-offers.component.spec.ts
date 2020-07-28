import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOffersComponent } from './show-offers.component';

describe('ShowOffersComponent', () => {
  let component: ShowOffersComponent;
  let fixture: ComponentFixture<ShowOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
