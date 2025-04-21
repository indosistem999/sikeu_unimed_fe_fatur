import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryImportComponent } from './history-import.component';

describe('HistoryImportComponent', () => {
  let component: HistoryImportComponent;
  let fixture: ComponentFixture<HistoryImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
