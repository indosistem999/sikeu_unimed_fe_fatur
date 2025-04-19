import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisTransportasiComponent } from './jenis-transportasi.component';

describe('JenisTransportasiComponent', () => {
  let component: JenisTransportasiComponent;
  let fixture: ComponentFixture<JenisTransportasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JenisTransportasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JenisTransportasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
