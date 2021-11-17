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
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/shared/models/game.model';
import { Competition } from 'src/app/shared/models/competition.model';
import { AccountService } from 'src/app/core/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-new-challenge',
  templateUrl: './new-challenge.component.html',
  styleUrls: ['./new-challenge.component.scss']
})
export class NewChallengeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private _gameService: GameService,
    private _tableService: TableService,
    private _competitionService: CompetitionService,
    private _teamService: TeamService,
    private _groupService: GroupService,
    private _accountservice: AccountService,
    private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private _alertService: AlertService
  ) {
    this.getData();
    this.getGroups();
    this.getGameTypes()
    this.getCompetitions()
    this.getTables();
  }

  form: FormGroup;
  teams: Team[];
  games: Game[] = []; //moet op voorhand gedeclareerd zijn
  gameTypes: GameType[];
  tables: Table[];
  userTeams: Team[] = []; //teams waar de user in zit
  groups: Group[];
  competitions: Competition[]
  teamUsers
  groupID;
  loading = false;
  

  //Selectionvariables
  selectedOwnTeamID;
  selectedOppTeamID;
  selectedGroupID;
  selectedGameTypeID;
  selectedCompetitionID;
  selectedTableID;
  selectedDate: Date;

  teamGroups: Team[]// de teams van de geselecteerde groep
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      groupID: ['', Validators.required],
      teamID: ['', Validators.required],
      gameTypeID: ['', Validators.required],
      competitionID: ['', Validators.required],
      tableID: ['', Validators.required],
      date: ['', Validators.required]
    });
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

  getCompetitions() {
    // subscribe to GET tables
    this._competitionService.getCompetitions().subscribe(
      result => {
        this.competitions = result;
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

  parseDate(date: string) {
    var x = date.split("-", 3)
    console.log(x)
    return new Date(Number(x[0]), Number(x[1]), Number(x[2].substr(0, 2)));
  }

  convertDate(date: NgbDate): Date {
    let x = this.ngbDateParserFormatter.format(date);
    console.log(x)
    return new Date(x);
  }

  onSubmit() {
    //let date = this.ngbDateParserFormatter.format(ngbDate);
    let date = new Date()
    var game:Game = new Game(0,0,0,new Date().toUTCString(),this.selectedOwnTeamID,this.selectedOwnTeamID,this.selectedTableID,this.selectedGameTypeID,null,this.selectedOppTeamID,2)
    console.log(game);
    this._gameService.addGame(game)
      .pipe(first())
      .subscribe({
        next: () => {
          this._alertService.success('Challenge send', { keepAfterRouteChange: true });
          this.router.navigate(['user/challenge']);
        },
        error: error => {
          this._alertService.error('er is iets fout gegaan');
          this.loading = false;
        }
      });
  }

  groupSelect(value: string) {
    this.selectedGroupID = Number(value)
    this._teamService.getTeamsByGroup(this.selectedGroupID).subscribe(result => {
      this.teamGroups = result
    })
    //als de group geselecteerd wordt zal dit gedisabled worden en worden de teams van deze group gezocht.
    console.log(value)
    //this._teamService.getTeamsByGroup(Number(value))
  }

  myTeamSelect(value: string) {
    this.selectedOwnTeamID = Number(value)
    console.log(value)
  }

  oppTeamSelect(value: string) {
    this.selectedOppTeamID = Number(value)
    console.log(value)
  }

  gameTypeSelect(value: string) {
    this.selectedGameTypeID = Number(value)
    console.log(value)
  }

  competitionSelect(value: string) {
    this.selectedCompetitionID = Number(value)
    console.log(value)
  }

  tableSelect(value: string) {
    this.selectedTableID = Number(value)
    console.log(value)
  }

  dateSelect(value: NgbDate) {
    this.selectedDate = this.convertDate(value)
    console.log(this.selectedDate)
  }
}
