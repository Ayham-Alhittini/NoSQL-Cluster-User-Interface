import { Component, OnInit } from '@angular/core';
import { NodesService } from 'src/app/services/nodes.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit{

  constructor(private nodesService: NodesService){}
  isClusterRunning = false;


  ngOnInit(): void {
    this.nodesService.getClusterRunningStatus().subscribe(res => {
      this.isClusterRunning = res["clusterRunningStatus"];
    });
  }

  startCluster() {
    this.nodesService.startClusterNodes().subscribe(() => {
      this.isClusterRunning = !this.isClusterRunning;
    });
  }

  shutdownCluster() {
    this.nodesService.shutDownClusterNodes().subscribe(() => {
      this.isClusterRunning = !this.isClusterRunning;
    });
  }
}
