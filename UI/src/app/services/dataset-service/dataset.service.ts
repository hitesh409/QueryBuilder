import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasetModel, TableModel } from '../../models/dataset-model';
import { environment } from '../../Utility/environment';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private url = `${environment}/api/Datasets`

  constructor(private http:HttpClient) { }

  getDataset():Observable<DatasetModel[]>{
    const token = localStorage.getItem('token'); 
    return this.http.get<DatasetModel[]>(this.url+"/GetDatasets", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getTables(datasetId:string):Observable<TableModel[]>{
    const token = localStorage.getItem('token'); 
    const Url = `${this.url}/Segregation?datasetId=${datasetId}`;
    return this.http.post<TableModel[]>(Url, {},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

   storeDataset(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token'); 
    return this.http.post<any>(this.url,formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
