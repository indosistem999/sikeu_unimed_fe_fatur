import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagianSuratComponent } from './bagian-surat.component';

describe('BagianSuratComponent', () => {
  let component: BagianSuratComponent;
  let fixture: ComponentFixture<BagianSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagianSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BagianSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
