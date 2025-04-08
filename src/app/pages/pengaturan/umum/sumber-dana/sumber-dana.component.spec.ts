import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumberDanaComponent } from './sumber-dana.component';

describe('SumberDanaComponent', () => {
  let component: SumberDanaComponent;
  let fixture: ComponentFixture<SumberDanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumberDanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumberDanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
