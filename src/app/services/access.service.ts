import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database } from '../model/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http : HttpClient) { }

  createDB(dbName: string) {
    return this.http.post<Database>('http://localhost:8080/api/access/createDB/' + dbName, null);
  }

  showDbs() {
    return this.http.get<Database[]>('http://localhost:8080/api/access/showDbs');
  }

}
