import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPegawaiComponent } from './edit-pegawai.component';

describe('EditPegawaiComponent', () => {
  let component: EditPegawaiComponent;
  let fixture: ComponentFixture<EditPegawaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPegawaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
