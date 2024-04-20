import { Injectable } from '@angular/core';

interface Node{
  key: string;
  lable : string;
  data?:any;
  edges: {
    nodeKey:string;
    lable: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor() { }
}
