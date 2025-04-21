import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPegawaiComponent } from './detail-pegawai.component';

describe('DetailPegawaiComponent', () => {
  let component: DetailPegawaiComponent;
  let fixture: ComponentFixture<DetailPegawaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPegawaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
