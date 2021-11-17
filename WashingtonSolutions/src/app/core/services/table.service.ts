import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Table } from 'src/app/shared/models/table.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${environment.apiUrl}/tables`);
    
  }

  getTable(id: number): Observable<Table> {
    return this.http.get<Table>(`${environment.apiUrl}/tables/${id}`);

  }

  addTable(table: Table) {
    return this.http.post(`${environment.apiUrl}/tables`, table);
  }

  deleteTable(id: number) {
    console.log("delete table " + id)
    return this.http.delete(`${environment.apiUrl}/tables/${id}`);
  }

  putTable(table: Table) {
    return this.http.put(`${environment.apiUrl}/tables/${table.tableID}`, table);
  }


}
