import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tournament } from 'src/app/shared/models/tournament.model'

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.apiUrl}/tournaments`);

  }

  getTournament(id:number): Observable<Tournament> {
    return this.http.get<Tournament>(`${environment.apiUrl}/tournaments/${id}`);

  }

  addTournament(tournament: Tournament) {
    return this.http.post(`${environment.apiUrl}/tournaments`, tournament);
  }

  deleteTournament(id: number) {
    return this.http.delete(`${environment.apiUrl}/tournaments/${id}`);
  }

  editTournament(tournament: Tournament) {
    return this.http.put(`${environment.apiUrl}/tournaments/${tournament.tournamentID}`, tournament );
  }
}
