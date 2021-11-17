import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { GameService } from 'src/app/core/services/game.service';
import { GroupService } from 'src/app/core/services/group.service';
import { TeamService } from 'src/app/core/services/team.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  games = null;
  groups;
  teams;

  constructor(
    private gameService: GameService,
    private alertService: AlertService,
    private _groupService: GroupService, 
    private _teamService: TeamService
  ) { 
    this.getGroups();
    this.getTeams();
   }

  ngOnInit(): void {
    this.gameService.getGames()
      .pipe(first())
      .subscribe(games => this.games = games);
      
  }

  deleteGame(id: number) {
    const game = this.games.find(x => x.gameID === id);
    console.log(game);
    game.isDeleting = true;
    this.gameService.deleteGame(id)
      .pipe(first())
      .subscribe(() => {
        this.games = this.games.filter(x => x.gameID !== id);
        this.alertService.success('Wedstrijd succesvol verwijderd');
      });
  }

  getGroups() {
    this._groupService.getGroups().subscribe(
      result => {
        this.groups = result;
      }
    )
  }

  getTeams() {
    // subscribe to GET teams
    this._teamService.getTeams().subscribe(
      result => {
        this.teams = result;
      }
    )
  }

}
