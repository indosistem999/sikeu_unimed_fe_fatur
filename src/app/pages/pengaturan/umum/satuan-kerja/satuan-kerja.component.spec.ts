import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatuanKerjaComponent } from './satuan-kerja.component';

describe('SatuanKerjaComponent', () => {
  let component: SatuanKerjaComponent;
  let fixture: ComponentFixture<SatuanKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatuanKerjaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SatuanKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
