import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccgLogoComponent } from './tccg-logo.component';

describe('TccgLogoComponent', () => {
  let component: TccgLogoComponent;
  let fixture: ComponentFixture<TccgLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccgLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccgLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
