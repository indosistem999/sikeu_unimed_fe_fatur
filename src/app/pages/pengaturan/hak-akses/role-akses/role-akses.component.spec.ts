import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAksesComponent } from './role-akses.component';

describe('RoleAksesComponent', () => {
  let component: RoleAksesComponent;
  let fixture: ComponentFixture<RoleAksesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAksesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleAksesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
