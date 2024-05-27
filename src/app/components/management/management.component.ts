import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackupService } from 'src/app/services/backup.service';
import { NodesService } from 'src/app/services/nodes.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit{

  constructor(private nodesService: NodesService, private backupService: BackupService, private toaster: ToastrService){}
  isClusterRunning = false;
  numberOfNodes: number | null = null;
  selectedFile: File | null = null;
  INPUT_RESET = null;




  ngOnInit(): void {
    this.nodesService.getClusterRunningStatus().subscribe(res => {
      this.isClusterRunning = res["clusterRunningStatus"];
    });
  }

  startCluster() {

    if (this.numberOfNodes == null) {
      this.toaster.error("Please enter number of nodes");
      return;
    }

    // this.isClusterRunning = true;
    this.nodesService.startClusterNodes(this.numberOfNodes).subscribe(() => {
      this.isClusterRunning = !this.isClusterRunning;
      this.numberOfNodes = null;
    });
  }

  shutdownCluster() {
    // this.isClusterRunning = false;
    this.nodesService.shutDownClusterNodes().subscribe(() => {
      this.isClusterRunning = !this.isClusterRunning;
    });
  }

  downloadBackup() {
    if (!this.isClusterRunning) return;// Also we expect the assoicated button is disabled for this case
    this.backupService.downloadBackup().subscribe();
  }


  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile() {
    if (!this.selectedFile) return 
    console.log(this.selectedFile);
    this.backupService.uploadBackup(this.selectedFile).subscribe(() => this.toaster.success("Backup uploaded successfully"));
    this.resetUpload();
  }


  resetUpload() {
    this.selectedFile = null;
    this.INPUT_RESET = null;
  }
}
