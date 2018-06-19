import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvolaAngularComponent } from './avola-angular.component';

describe('AvolaAngularComponent', () => {
  let component: AvolaAngularComponent;
  let fixture: ComponentFixture<AvolaAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvolaAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvolaAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
