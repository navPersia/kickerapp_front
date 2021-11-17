import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/shared/models/game.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) {
  }
  getGames () {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`);
  }

  getGame (id: number) {
    return this.http.get<Game>(`${environment.apiUrl}/games/${id}`);
  }

  addGame(game) {
    return this.http.post(`${environment.apiUrl}/games`, game);
  }

  putGame (id, params) {
    return this.http.put(`${environment.apiUrl}/games/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

  deleteGame (id: number) {
    return this.http.delete(`${environment.apiUrl}/games/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

  patch (id, params) {
    return this.http.patch(`${environment.apiUrl}/games/${id}`, params);
  }
}
