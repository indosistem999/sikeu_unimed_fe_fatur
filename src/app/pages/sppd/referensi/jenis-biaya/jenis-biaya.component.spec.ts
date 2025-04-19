import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisBiayaComponent } from './jenis-biaya.component';

describe('JenisBiayaComponent', () => {
  let component: JenisBiayaComponent;
  let fixture: ComponentFixture<JenisBiayaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JenisBiayaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JenisBiayaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
