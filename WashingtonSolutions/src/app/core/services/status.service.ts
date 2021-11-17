import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from 'src/app/shared/models/status.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatus () {
    return this.http.get<Status[]>(`${environment.apiUrl}/gamestatus`);
  }
}
