import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitasComponent } from './identitas.component';

describe('IdentitasComponent', () => {
  let component: IdentitasComponent;
  let fixture: ComponentFixture<IdentitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
