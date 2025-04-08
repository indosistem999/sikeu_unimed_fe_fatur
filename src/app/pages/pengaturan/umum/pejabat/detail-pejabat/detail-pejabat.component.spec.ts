import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPejabatComponent } from './detail-pejabat.component';

describe('DetailPejabatComponent', () => {
  let component: DetailPejabatComponent;
  let fixture: ComponentFixture<DetailPejabatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPejabatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPejabatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
