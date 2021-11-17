import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../../shared/models/file.model';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUploadUrl: string;
  constructor(private http: HttpClient) {
    this.apiUploadUrl = 'https://kickerapi.azurewebsites.net/api/file/upload';
  }

  public getFile (id: number) {
    return this.http.get<File>(`${environment.apiUrl}/file/${id}`);
  }

  public uploadFile (file: Blob): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.request(new HttpRequest(
      'POST',
      this.apiUploadUrl,
      formData,
      {
        reportProgress: true
      }));
  }

  public upload (file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.apiUrl}/file/upload`, formData);
  }
}
