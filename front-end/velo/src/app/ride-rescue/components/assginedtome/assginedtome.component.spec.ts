import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssginedtomeComponent } from './assginedtome.component';

describe('AssginedtomeComponent', () => {
  let component: AssginedtomeComponent;
  let fixture: ComponentFixture<AssginedtomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssginedtomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssginedtomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
