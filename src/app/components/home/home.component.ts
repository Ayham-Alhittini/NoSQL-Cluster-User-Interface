import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Database } from 'src/app/model/database';
import { DatabaseService } from 'src/app/services/access.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newDatabaseName: string;
  showModal: boolean = false;
  selectedDatabase: Database = null;


  databases: Database[] = [];

  constructor( public authService: AuthService , private databaseService: DatabaseService,
    private router: Router, private route: ActivatedRoute, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.databaseService.showDbs().subscribe(dbs => {
      this.databases = dbs;
      this.getActivatedDatabase();
    })
  }


  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.newDatabaseName = '';
    }
  }

  selectDatabase(db: any) {
    this.router.navigateByUrl("/database/" + db.dbName);
  }

  getActivatedDatabase(): void {
    this.route.paramMap.subscribe(params => {
      const activatedDatabase = params.get('name');
      this.selectedDatabase = this.databases.find(db => db.dbName === activatedDatabase);
    });
  }

  copyToClipboard(toCopyStr: string) {
    navigator.clipboard.writeText(toCopyStr).then(() => {
      this.toaster.show("Copied")
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }


  createDatabase(): void {
    if (!this.newDatabaseName.trim()) {
      alert('Please enter a database name.');
      return;
    }

    this.databaseService.createDB(this.newDatabaseName).subscribe({
      next: db => {
        console.log(db);
        this.databases.push(db);
        this.toggleModal();
        this.selectDatabase(db);
      }, error: err => {
        console.log(err);
        this.toggleModal();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}