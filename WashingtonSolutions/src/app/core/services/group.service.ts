import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Group } from 'src/app/shared/models/group.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) {
  }
  getGroups () {
    return this.http.get<Group[]>(`${environment.apiUrl}/groups`);
  }

  getGroup (id: number) {
    return this.http.get<Group>(`${environment.apiUrl}/groups/${id}`);
  }

  addGroup (group) {
    return this.http.post(`${environment.apiUrl}/groups`, group);
  }

  putGroup (id, params) {
    return this.http.put(`${environment.apiUrl}/groups/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

  deleteGroup (id: number) {
    return this.http.delete(`${environment.apiUrl}/groups/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
