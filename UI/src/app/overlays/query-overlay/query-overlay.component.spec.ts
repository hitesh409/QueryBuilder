import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOverlayComponent } from './query-overlay.component';

describe('QueryOverlayComponent', () => {
  let component: QueryOverlayComponent;
  let fixture: ComponentFixture<QueryOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueryOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
