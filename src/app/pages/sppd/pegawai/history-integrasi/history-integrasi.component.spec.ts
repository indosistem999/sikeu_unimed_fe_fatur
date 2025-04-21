import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryIntegrasiComponent } from './history-integrasi.component';

describe('HistoryIntegrasiComponent', () => {
  let component: HistoryIntegrasiComponent;
  let fixture: ComponentFixture<HistoryIntegrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryIntegrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryIntegrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
