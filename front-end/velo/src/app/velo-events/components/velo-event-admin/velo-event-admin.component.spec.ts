import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeloEventAdminComponent } from './velo-event-admin.component';

describe('VeloEventAdminComponent', () => {
  let component: VeloEventAdminComponent;
  let fixture: ComponentFixture<VeloEventAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeloEventAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeloEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
