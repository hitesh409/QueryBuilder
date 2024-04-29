import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineTablesScreenComponent } from './combine-tables-screen.component';

describe('CombineTablesScreenComponent', () => {
  let component: CombineTablesScreenComponent;
  let fixture: ComponentFixture<CombineTablesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombineTablesScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombineTablesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
