import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahPasswordComponent } from './ubah-password.component';

describe('UbahPasswordComponent', () => {
  let component: UbahPasswordComponent;
  let fixture: ComponentFixture<UbahPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbahPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbahPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
