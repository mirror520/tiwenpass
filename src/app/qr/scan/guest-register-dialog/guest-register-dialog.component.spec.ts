import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRegisterDialogComponent } from './guest-register-dialog.component';

describe('GuestRegisterDialogComponent', () => {
  let component: GuestRegisterDialogComponent;
  let fixture: ComponentFixture<GuestRegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRegisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
