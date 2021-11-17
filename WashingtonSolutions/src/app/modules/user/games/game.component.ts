import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { GroupService } from 'src/app/core/services/group.service';
import { TableService } from 'src/app/core/services/table.service';
import { TeamService } from 'src/app/core/services/team.service';
import { GameType } from 'src/app/shared/models/game-type.model';
import { Group } from 'src/app/shared/models/group.model';
import { Table } from 'src/app/shared/models/table.model';
import { Team } from 'src/app/shared/models/team.model';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../shared/models/game.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  games: Game[] = []; //moet op voorhand gedeclareerd zijn
  gameTypes: GameType[];
  tables: Table[];
  teams: Team[]; // alle teams.
  groups: Group[];
  //userdata
  userTeams: Team[] = []; //teams waar de user in zit
  teamUsers
  groupID;

  constructor(private _gameService: GameService, private _tableService: TableService, private _competitionService: CompetitionService, private _teamService: TeamService, private _groupService: GroupService, private router: Router, private _accountservice: AccountService) {
    this.getData();
    this.getGameTypes();
    this.getTables();
    this.getTeams();
    this.getGroups();
  }

  ngOnInit(): void {
  }

  getData() {
    this._accountservice.getUser()
      .subscribe(result => {
        this.teamUsers = result.teamUsers
        this.groupID = result.groupID
        console.log(this.groupID)
        console.log(result.teamUsers)
        //als dit een uncompilable error geeft moet ik dit nog toev. aan het model user.

        for (let t of this.teamUsers) {
          //2de observable moet gebeuren als 1ste gedaan is.
          this._teamService.getTeam(t.teamID).subscribe(res => {
            console.log(res)
            this.userTeams.push(res)
            console.log("teams:")
            console.log(this.userTeams)
            //Games van dit team toevoegen aan this.games
            this._gameService.getGames().subscribe(r => {
              console.log(r)
              this.games = this.games.concat(r)
              console.log("games:")
              console.log(this.games)
            })
          })
        }
      })
  }

  getGames() {
    // subscribe to GET all games
    this._gameService.getGames().subscribe(
      result => {
        this.games = result;
      }
    )
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

  gameDetails(id) {
    this.router.navigateByUrl("/user/games/edit/" + id);
  };

}
