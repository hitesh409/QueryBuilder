import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-query-overlay',
  templateUrl: './query-overlay.component.html',
  styleUrl: './query-overlay.component.css',
})
export class QueryOverlayComponent {
  data = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 12, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 13, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 14, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 15, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne'},


  ];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  fetchData() {
    this.dataSource.data = this.data;
  }
  ngOnInit() {
    this.fetchData(); // Call the method to fetch data on component initialization (optional)
  }
}
