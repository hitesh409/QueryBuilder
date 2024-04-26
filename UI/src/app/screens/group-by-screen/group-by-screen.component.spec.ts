import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByScreenComponent } from './group-by-screen.component';

describe('GroupByScreenComponent', () => {
  let component: GroupByScreenComponent;
  let fixture: ComponentFixture<GroupByScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupByScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupByScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
