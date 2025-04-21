import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPegawaiComponent } from './list-pegawai.component';

describe('ListPegawaiComponent', () => {
  let component: ListPegawaiComponent;
  let fixture: ComponentFixture<ListPegawaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPegawaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
