import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunAnggaranComponent } from './tahun-anggaran.component';

describe('TahunAnggaranComponent', () => {
  let component: TahunAnggaranComponent;
  let fixture: ComponentFixture<TahunAnggaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TahunAnggaranComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TahunAnggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
