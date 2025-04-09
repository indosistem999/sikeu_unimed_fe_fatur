import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModulComponent } from './detail-modul.component';

describe('DetailModulComponent', () => {
  let component: DetailModulComponent;
  let fixture: ComponentFixture<DetailModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailModulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
