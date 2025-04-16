import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRoleAksesComponent } from './detail-role-akses.component';

describe('DetailRoleAksesComponent', () => {
  let component: DetailRoleAksesComponent;
  let fixture: ComponentFixture<DetailRoleAksesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRoleAksesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailRoleAksesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
