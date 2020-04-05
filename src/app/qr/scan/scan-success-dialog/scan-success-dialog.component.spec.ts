import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanSuccessDialogComponent } from './scan-success-dialog.component';

describe('ScanSuccessDialogComponent', () => {
  let component: ScanSuccessDialogComponent;
  let fixture: ComponentFixture<ScanSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
