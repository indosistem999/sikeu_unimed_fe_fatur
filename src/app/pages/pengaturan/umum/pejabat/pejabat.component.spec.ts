import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PejabatComponent } from './pejabat.component';

describe('PejabatComponent', () => {
  let component: PejabatComponent;
  let fixture: ComponentFixture<PejabatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PejabatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PejabatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
