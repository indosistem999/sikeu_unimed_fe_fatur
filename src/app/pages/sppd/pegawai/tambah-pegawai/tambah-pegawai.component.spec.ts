import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPegawaiComponent } from './tambah-pegawai.component';

describe('TambahPegawaiComponent', () => {
  let component: TambahPegawaiComponent;
  let fixture: ComponentFixture<TambahPegawaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahPegawaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TambahPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
