import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAktifitasComponent } from './log-aktifitas.component';

describe('LogAktifitasComponent', () => {
  let component: LogAktifitasComponent;
  let fixture: ComponentFixture<LogAktifitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAktifitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogAktifitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
