import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangkatGolonganComponent } from './pangkat-golongan.component';

describe('PangkatGolonganComponent', () => {
  let component: PangkatGolonganComponent;
  let fixture: ComponentFixture<PangkatGolonganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PangkatGolonganComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PangkatGolonganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
