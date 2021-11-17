import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../../core/services/alert.service';
import { GameService } from '../../../../core/services/game.service';
import { TableService } from '../../../../core/services/table.service';
import { TeamService } from '../../../../core/services/team.service';
import { TournamentService } from '../../../../core/services/tournament.service';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

interface Option {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  tables: Option[] = [

  ];

  teams: Option[] = [

  ];

  gameTypes: Option[] = [
    { value: 1, viewValue: '1v1'},
    { value: 2, viewValue: '2v2'}
  ];

  tournaments: Option[] = [

  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private tableService: TableService,
    private alertService: AlertService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);//parse
    this.isAddMode = !this.id; //bij edit

    this.tournamentService.getTournaments()
      .pipe(first())
      .subscribe(x =>
        x.forEach(tournament =>
          this.tournaments.push(
            { value: tournament.tournamentID, viewValue: tournament.name }
          )
        )
      );

    this.teamService.getTeams()
      .pipe(first())
      .subscribe(x =>
        x.forEach(team =>
          this.teams.push(
            { value: team.teamID, viewValue: team.teamName }
          )
        )
      );

    this.tableService.getTables()
      .pipe(first())
      .subscribe(x =>
        x.forEach(table =>
          this.tables.push(
            { value: table.tableID, viewValue: table.tableName }
          )
        )
      );

    console.log(this.tournaments);
    console.log(this.teams);
    console.log(this.tables);

    this.form = this.formBuilder.group({
      scoreTeamA: [0,Validators.required],
      scoreTeamB: [0, Validators.required],
      date: ['',Validators.required],
      tableID: [''],
      teamAID: [null],
      teamBID: [null],
      gameTypeID: [1],
      tournamentID: [null]
    });

    if (!this.isAddMode) {
      this.gameService.getGame(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          let date = this.ngbDateParserFormatter.parse(x.date);
          this.form.patchValue({
            date: date
          })
        });
    }
  }

  get f () { return this.form.controls; }

  onSubmit () {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createGame();
    } else {
      this.updateGame();
    }
  }
  updateGame () {
    let values = this.form.value;
    let ngbDate = values.date;
    let date = this.ngbDateParserFormatter.format(ngbDate);
    var updateGame = {
      gameID: this.id,
      scoreTeamA: values.scoreTeamA,
      scoreTeamB: values.scoreTeamB,
      date: date + "T00:00:00",
      teamAID: parseInt(values.teamAID),
      teamBID: parseInt(values.teamBID),
      tableID: parseInt(values.tableID),
      tournamentID: parseInt(values.tournamentID),
      gameTypeID: parseInt(values.gameTypeID)
    }
    console.log(updateGame);
    this.gameService.putGame(this.id, updateGame)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Wedstrijd succesvol geupdate', { keepAfterRouteChange: true });
          this.router.navigate(['../../list'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
  createGame () {
    let values = this.form.value;
    let ngbDate = values.date;
    let date =this.ngbDateParserFormatter.format(ngbDate);
    var newGame = {
      scoreTeamA: values.scoreTeamA,
      scoreTeamB: values.scoreTeamB,
      date: date+"T00:00:00",
      teamAID: parseInt(values.teamAID),
      teamBID: parseInt(values.teamBID),
      tableID: parseInt(values.tableID),
      tournamentID: parseInt(values.tournamentID),
      gameTypeID: parseInt(values.gameTypeID)
    }
    console.log(newGame);
    this.gameService.addGame(newGame)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Wedstrijd succesvol toegevoegd', { keepAfterRouteChange: true });
          this.router.navigate(['../list'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  goBack () {
    this.router.navigateByUrl("/admin/game/list")
  }

}
