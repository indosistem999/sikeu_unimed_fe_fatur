import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriJabatanComponent } from './kategori-jabatan.component';

describe('KategoriJabatanComponent', () => {
  let component: KategoriJabatanComponent;
  let fixture: ComponentFixture<KategoriJabatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategoriJabatanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KategoriJabatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
