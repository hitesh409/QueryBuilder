import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoditionScreenComponent } from './codition-screen.component';

describe('CoditionScreenComponent', () => {
  let component: CoditionScreenComponent;
  let fixture: ComponentFixture<CoditionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoditionScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoditionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
