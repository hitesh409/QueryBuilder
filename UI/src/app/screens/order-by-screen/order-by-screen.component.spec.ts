import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByScreenComponent } from './order-by-screen.component';

describe('OrderByScreenComponent', () => {
  let component: OrderByScreenComponent;
  let fixture: ComponentFixture<OrderByScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderByScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderByScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
