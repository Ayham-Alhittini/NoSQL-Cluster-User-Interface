import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http : HttpClient) { }
  
  baseUrl = 'http://localhost:8081/api/collection/';

  showCollections(databaseName: string) {
    return this.http.get<string[]>(this.baseUrl + 'getCollections/' + databaseName);
  }
  
  showSchema(databaseName: string, collectionName: string) {
    return this.http.get<any>(this.baseUrl + 'getSchema/' + databaseName + '/' + collectionName);

  }

}
