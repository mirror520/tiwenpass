import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateVerificationDialogComponent } from './duplicate-verification-dialog.component';

describe('DuplicateVerificationDialogComponent', () => {
  let component: DuplicateVerificationDialogComponent;
  let fixture: ComponentFixture<DuplicateVerificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateVerificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
