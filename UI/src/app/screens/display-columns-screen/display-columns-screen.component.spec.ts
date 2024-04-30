import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayColumnsScreenComponent } from './display-columns-screen.component';

describe('DisplayColumnsScreenComponent', () => {
  let component: DisplayColumnsScreenComponent;
  let fixture: ComponentFixture<DisplayColumnsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayColumnsScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayColumnsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
