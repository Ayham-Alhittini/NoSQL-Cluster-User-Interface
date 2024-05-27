import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http : HttpClient) { }
  
  baseUrl = 'http://localhost:8081/api/index/';

  showIndexes(databaseName: string, collectionName: string) {
    return this.http.get<string[]>(this.baseUrl + 'getIndexes/' + databaseName + '/' + collectionName);

  }
}
