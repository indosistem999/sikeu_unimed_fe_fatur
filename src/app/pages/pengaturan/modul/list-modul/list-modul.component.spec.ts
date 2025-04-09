import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModulComponent } from './list-modul.component';

describe('ListModulComponent', () => {
  let component: ListModulComponent;
  let fixture: ComponentFixture<ListModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
