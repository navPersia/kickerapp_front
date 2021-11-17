import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Competition } from 'src/app/shared/models/competition.model';
import { GameType } from 'src/app/shared/models/game-type.model';
import { Group } from 'src/app/shared/models/group.model';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private competition: Observable<Competition>;

  constructor(private http: HttpClient) {

  }

  // GET competitions
  public getCompetitions() {
    return this.http.get<Competition[]>(`${environment.apiUrl}/competitions`);
  }

  // GET competition by id
  public getCompetitionById(id: number) {
    return this.http.get<Competition>(`${environment.apiUrl}/competitions/` + id);
  }

  // GET gameTypes
  public getGameTypes() {
    return this.http.get<GameType[]>(`${environment.apiUrl}/gametypes`);
  }

  // GET groups
  public getGroups() {
    return this.http.get<Group[]>(`${environment.apiUrl}/groups`);
  }

  // POST competition
  public postCompetition(competition: Competition) {
    return this.http.post<Competition>(`${environment.apiUrl}/competitions`, competition);
  }

  // PUT competition
  public putCompetition(id: number, competition: Competition) {
    return this.http.put<Competition>(`${environment.apiUrl}/competitions/` + id, competition);
  }

  // DELETE competition
  public deleteCompetition(competitionID: number) {
    return this.http.delete<Competition>(`${environment.apiUrl}/competitions/` + competitionID);
  }
}
