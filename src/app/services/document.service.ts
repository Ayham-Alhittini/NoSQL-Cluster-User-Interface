import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl = 'http://localhost:8081/api/search/byFilter';
  constructor(private http : HttpClient) { }

  showDocuments(databaseName: string, collectionName: string) {
    return this.http.post<any>(this.baseUrl + '/' + databaseName + '/' + collectionName, {});
  }

}
