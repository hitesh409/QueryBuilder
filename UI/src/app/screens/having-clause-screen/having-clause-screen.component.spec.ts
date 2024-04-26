import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HavingClauseScreenComponent } from './having-clause-screen.component';

describe('HavingClauseScreenComponent', () => {
  let component: HavingClauseScreenComponent;
  let fixture: ComponentFixture<HavingClauseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HavingClauseScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HavingClauseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
