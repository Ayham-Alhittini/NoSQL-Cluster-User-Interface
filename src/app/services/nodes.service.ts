import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private http: HttpClient) { }

  startClusterNodes() {
    return this.http.post('http://localhost:8080/api/cluster/start', null);
  }

  shutDownClusterNodes() {
    return this.http.post('http://localhost:8080/api/cluster/shutdown', null);
  }

  getClusterRunningStatus() {
    return this.http.get('http://localhost:8080/api/cluster/clusterRunningStatus');
  }


}
