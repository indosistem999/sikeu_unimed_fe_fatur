import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KopSuratComponent } from './kop-surat.component';

describe('KopSuratComponent', () => {
  let component: KopSuratComponent;
  let fixture: ComponentFixture<KopSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KopSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KopSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
