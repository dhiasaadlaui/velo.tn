import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandesComponent } from './show-demandes.component';

describe('ShowDemandesComponent', () => {
  let component: ShowDemandesComponent;
  let fixture: ComponentFixture<ShowDemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
