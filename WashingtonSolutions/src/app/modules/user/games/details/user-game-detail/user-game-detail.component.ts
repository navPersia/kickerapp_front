import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { GameService } from 'src/app/core/services/game.service';
import { GroupService } from 'src/app/core/services/group.service';
import { TableService } from 'src/app/core/services/table.service';
import { TeamService } from 'src/app/core/services/team.service';
import { StatusService } from 'src/app/core/services/status.service';
import { TournamentService } from 'src/app/core/services/tournament.service';
import { GameType } from 'src/app/shared/models/game-type.model';
import { Game } from 'src/app/shared/models/game.model';
import { Group } from 'src/app/shared/models/group.model';
import { Table } from 'src/app/shared/models/table.model';
import { Team } from 'src/app/shared/models/team.model';
import { Tournament } from 'src/app/shared/models/tournament.model';
import { Status } from 'src/app/shared/models/status.model';

@Component({
  selector: 'app-user-game-detail',
  templateUrl: './user-game-detail.component.html',
  styleUrls: ['./user-game-detail.component.scss']
})
export class UserGameDetailComponent implements OnInit {

  gameID = Number(this.route.snapshot.paramMap.get("id"));
  game: Game;
  gameTypes: GameType[];
  tables: Table[];
  teams: Team[];
  groups: Group[];
  tournaments: Tournament[];
  status: Status[];

  constructor(
    private _gameService: GameService, 
    private _tableService: TableService, 
    private _competitionService: CompetitionService, 
    private _teamService: TeamService, 
    private _groupService: GroupService, 
    private _tournamentService: TournamentService, 
    private _statusService: StatusService, 
    private router: Router, 
    private route: ActivatedRoute
    ) {
    this.getGame();
    this.getGameTypes();
    this.getTables();
    this.getTeams();
    this.getGroups();
    this.getTournament();
    this.getStatus();
   }

  ngOnInit(): void {
    
  }

  getGame() {
    // subscribe to GET game
    this._gameService.getGame(this.gameID).subscribe(
      result => {
        this.game = result;
      }
    )
    const timer = 5*60;
    setTimeout(() => {
      console.log(new Date());
      this.getGame();
    }, timer * 1000);
  }

  getGameTypes() {
    // subscribe to GET gameTypes
    this._competitionService.getGameTypes().subscribe(
      result => {
        this.gameTypes = result;
      }
    )
  };

  getTables() {
    // subscribe to GET tables
    this._tableService.getTables().subscribe(
      result => {
        this.tables = result;
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

  getGroups() {
    this._groupService.getGroups().subscribe(
      result => {
        this.groups = result;
      }
    )
  }

  getTournament() {
    this._tournamentService.getTournaments().subscribe (
      result => {
        this.tournaments = result;
      }
    )
  }

  getStatus() {
    this._statusService.getStatus().subscribe (
      result => {
        this.status = result;
      }
    )
  }

  gameDetails(id) {
    this.router.navigateByUrl("/user/games/edit/" + id);
  };

  startGame() {
    if (this.game.gameStatusID==1) {
      let patchDocument = [];
      patchDocument.push({ op: "replace", path: "/gameStatusID", value: 3 })
      console.log(this.game.gameID)
      console.log(patchDocument)
      this._gameService.patch(this.game.gameID, patchDocument)
        .subscribe(x => {
          this.getGame();
        })
    } else {
      console.log("niet planned")
    }
    
  }

  changeScore() {
    if (this.game.gameStatusID==3 || this.game.gameStatusID==7) {
      let patchDocument = [];
      patchDocument.push({ op: "replace", path: "/gameStatusID", value: 7 })
      patchDocument.push({ op: "replace", path: "/scoreTeamA", value: this.game.scoreTeamA })
      patchDocument.push({ op: "replace", path: "/scoreTeamB", value: this.game.scoreTeamB })
      console.log(this.game.gameID)
      console.log(patchDocument)
      this._gameService.patch(this.game.gameID, patchDocument)
        .subscribe(x => {
          this.getGame();
        })
    }

  }

  verifyScore() {
    if (this.game.gameStatusID==7 || this.game.gameStatusID==5) {
      let patchDocument = [];
      patchDocument.push({ op: "replace", path: "/gameStatusID", value: 3 })
      console.log(this.game.gameID)
      console.log(patchDocument)
      this._gameService.patch(this.game.gameID, patchDocument)
        .subscribe(x => {
          this.getGame();
        })
    }
  }

  dispute() {
    if (this.game.gameStatusID==7){
      let patchDocument = [];
      patchDocument.push({ op: "replace", path: "/gameStatusID", value: 5 })
      console.log(this.game.gameID)
      console.log(patchDocument)
      this._gameService.patch(this.game.gameID, patchDocument)
        .subscribe(x => {
          this.getGame();
        })
    }
  }

  endGame() {
    if (this.game.gameStatusID == 3) {
      let patchDocument = [];
      patchDocument.push({ op: "replace", path: "/gameStatusID", value: 4 })
      console.log(this.game.gameID)
      console.log(patchDocument)
      this._gameService.patch(this.game.gameID, patchDocument)
        .subscribe(x => {
          this.getGame();
        })
    }
  }

  goBack () {
    this.router.navigateByUrl("/user/games")
  }
}
