import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatasetService } from '../../services/dataset-service/dataset.service';
import { DatasetModel, TableModel } from '../../models/dataset-model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { animate, style, transition, trigger } from '@angular/animations';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('tableOpenClose', [
      transition('closed => open', [
        style({ height: '0px', opacity: 0 }),
        animate('1ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition('open => closed', [
        style({ height: '*', opacity: 1 }),
        animate('1s ease-in-out', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SharedComponent implements OnInit {
  showLogoutOverlay = false;
  showUploadOverlay = false;
  showTables: boolean = false;
  chosenDatasetIndex: number = -1;
  datasets: DatasetModel[] = [];
  overlayRef: OverlayRef | null = null;
  errorMessage: string | null = null;
  tables:TableModel[]=[];
  
  

  constructor(private datasetService: DatasetService,private overlay : Overlay,private service : StateManagementService) {}
  ngOnInit(): void {
    this.fetchDatasets();
  }

  async fetchDatasets() {
    this.datasetService.getDataset().subscribe(
      (datasets: DatasetModel[]) => {
        this.datasets = datasets
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          )
          .map((dataset) => ({
            ...dataset,
            name: dataset.name.replace(/\.[^/.]+$/, ''),
          }));

        console.log('datasets: ', this.datasets);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  // onTableSelected(table:TableModel[]){
  //   if(table){
  //     this.tableArray = table;
  //   }
  // }

  // onSubQueryGenerated(subQuery:string){
  //   if(subQuery){
  //     this.subQuery = subQuery;
  //   }
  // }

  // onAggragateSelected(agg:string[]){
  //   if(agg)
  //     this.aggregateFunctions = agg;
  // }

  getTables(datasetId: string) {
    this.datasetService.getTables(datasetId).subscribe(
      (tables) => {
        this.service.tables = tables;
        this.tables = this.service.tables;
        console.log('Tables: ', this.service.tables[0]);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
    console.log("TableArray: ",this.service.tableArray);
    console.log("AggregateFunction: ",this.service.aggregateFunctions)
    console.log("subQuery: ",this.service.subQuery);
  }

  toggleDatasetSelection(index: number) {
    if (this.chosenDatasetIndex !== index) {
      this.chosenDatasetIndex = index;
      this.service.chosenDataset = this.datasets[index];
      this.getTables(this.service.chosenDataset.id);
    }
  }

  toggleOverlay() {
    this.showLogoutOverlay = !this.showLogoutOverlay;
  }

  toggleUpload() {
    this.showUploadOverlay = true;
  }

  handleLogout() {
    console.log('User logged out!');
    this.showLogoutOverlay = !this.showLogoutOverlay;
  }

  handleUpload() {
    console.log('Uploaded successfully');
    this.showUploadOverlay = !this.showUploadOverlay;
  }

  onDatasetUploaded() {
    this.fetchDatasets();
  }
}
