import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDatabaseComponent } from './upload-database.component';

describe('UploadDatabaseComponent', () => {
  let component: UploadDatabaseComponent;
  let fixture: ComponentFixture<UploadDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
