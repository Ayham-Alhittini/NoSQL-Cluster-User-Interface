import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Database } from 'src/app/model/database';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionService } from 'src/app/services/collection.service';
import { DocumentService } from 'src/app/services/document.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newDatabaseName: string;
  showModal: boolean = false;
  selectedDatabase: Database = null;
  selectedCollection: string = null;
  databases: Database[] = [];
  collapsedStates: boolean[] = [];
  activeDatabaseIndex = -1;
  documents = [];
  selectedDocument = null;
  schema = null;
  indexes = [];


  constructor( public authService: AuthService , 
    private databaseService: DatabaseService, private collectionService: CollectionService, private documentService: DocumentService, private indexService: IndexService,
    private router: Router, private route: ActivatedRoute, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.databaseService.showDbs().subscribe(dbs => {
      if (dbs.length > 0) {
        this.databases = dbs;
        dbs.forEach(db => {
          this.assignDbCollections(db);
        });
        this.collapsedStates = this.databases.map(() => true);
        this.getActivatedDatabase();
      }
    })
  }


  toggleModal(): void {
    
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.newDatabaseName = '';
    }
  }

  isCollapsed(index: number): boolean {
    return this.collapsedStates[index]; // You need to manage these states based on collapse events
  }
  
  toggleCollapse(index: number): void {
    this.activeDatabaseIndex = index;
    this.selectedCollection = null;
    this.collapsedStates[index] = !this.collapsedStates[index];
    this.router.navigateByUrl('/database/' + this.databases.at(index).dbName);
  }

  selectDatabase(db: any) {
    this.selectedCollection = null;
    this.router.navigateByUrl("/database/" + db.dbName);
  }

  getActivatedDatabase(): void {
    this.route.paramMap.subscribe(params => {
      const activatedDatabase = params.get('name');
      this.selectedDatabase = this.databases.find(db => db.dbName === activatedDatabase);
      this.assignDbCollections(this.selectedDatabase);
    });
  }

  assignDbCollections(db: Database) {
    this.collectionService.showCollections(db?.dbName).subscribe(collections => db.collections = collections);
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


  showCollection(collection: string) {

    this.documentService.showDocuments(this.selectedDatabase.dbName, collection)
        .subscribe(docs => this.documents = docs);

    this.collectionService.showSchema(this.selectedDatabase.dbName, collection)
      .subscribe(schema => this.schema = schema);

    this.indexService.showIndexes(this.selectedDatabase.dbName, collection)
      .subscribe(indexes => this.indexes = indexes);

    this.selectedCollection = collection;
  }

  truncate(text: string): string {
    return text.substring(0, 10) + '...';
  }

  removeFormat(filename): string {
    return filename.substring(0, filename.indexOf('.'));
  }
  
  logout(): void {
    this.authService.logout();
  }
}