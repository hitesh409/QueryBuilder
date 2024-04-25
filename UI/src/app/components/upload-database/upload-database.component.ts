import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DatasetService } from '../../services/dataset-service/dataset.service';
import { Router } from '@angular/router';
import { DatasetModel } from '../../models/dataset-model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-upload-database',
  templateUrl: './upload-database.component.html',
  styleUrl: './upload-database.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('0.7s ease')), 
    ])
  ]
})
export class UploadDatabaseComponent {

  @Input() showUploadOverlay = true;
  @Input() datasets : DatasetModel[] = [];
  @Output() uploadClicked = new EventEmitter<void>();
  @Output() datasetUploaded = new EventEmitter<void>();

  selectedFile: File | null = null;
  isUploadOverlayVisible = false;

  constructor(private http: HttpClient,private datasetService : DatasetService,private router:Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  toggleUploadOverlay() {
    this.showUploadOverlay = false;
    this.uploadClicked.emit();
  }

  uploadDataset() {
    if (!this.selectedFile) {
      throwError('No file selected!');
      return;
    }

    try {
      this.datasetService.storeDataset(this.selectedFile)
        .subscribe(response => {
          console.log('Dataset upload successful!', response);
          
          this.selectedFile = null;
          this.showUploadOverlay = false;
          this.uploadClicked.emit();
          this.datasetUploaded.emit();
          this.router.navigate(['/shared'])
        }, error => {
          console.error('Error uploading dataset:', error);
        });
    } catch (error) {
      console.error('Error during upload:', error);
    }
    
  }

  
}
