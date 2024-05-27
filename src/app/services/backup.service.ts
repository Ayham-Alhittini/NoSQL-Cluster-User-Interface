import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8081/api/backup/';

  downloadBackup(): Observable<HttpResponse<Blob>> {
    return this.http.get(this.baseUrl + 'downloadBackup', { observe: 'response', responseType: 'blob' })
      .pipe(
        tap(
          (response: HttpResponse<Blob>) => {
            // Check for null!
            const contentDisposition = response.headers.get('Content-Disposition');
            if (contentDisposition) {
              const filename = contentDisposition.split(';')[1].split('=')[1].replace(/"/g, '');
              saveAs(response.body, filename);
            } else {
              // Handle the case where Content-Disposition is not available.
              // For example, default a filename or show an error.
              console.error('Content-Disposition header not present in the response');
              saveAs(response.body, 'backup.zip');
            }
          },
          error => {
            console.error('Error downloading the file', error);
            // Handle the error properly.
          }
        )
      );
  }

  uploadBackup(file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('backupFile', file, file.name);

    return this.http.post<void>(this.baseUrl + 'uploadBackup', formData);
  }

}
