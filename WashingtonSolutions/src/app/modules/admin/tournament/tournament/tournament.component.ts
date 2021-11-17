import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/core/services/tournament.service'
import { Tournament } from 'src/app/shared/models/tournament.model'
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { GroupService } from 'src/app/core/services/group.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  constructor(
    private _tournamentService: TournamentService,
    private _competitionService: CompetitionService,
    private _groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router) {
    this.getGroups();
    this.getCompetitions();
  }

  tournaments: Tournament[];
  date;
  columnsToDisplay = ['tournamentID', 'name', 'startdate', 'enddate', 'competition', 'winner', 'acties'];
  loaded = false;
  groups;
  competitions;

  //CRUD METHODES

  getTournaments() {
    this.loaded = false;
    this._tournamentService.getTournaments().subscribe(result => {
      this.tournaments = result;
      console.log(result);
      this.loaded = true;
    })
  }

  announceWinner(id: number) {
    //gaat niet als: er games zijn zonder score
    // de einddatum nog niet afgelopen is.

    //bepaal het team met de meeste wins in het tournooi

    //kijk voor welke groep ze spelen
    //PUT groepID vd winnaars in winnerID

    //refresh lijst
  }

  deleteTournament(id: number) {
    this._tournamentService.deleteTournament(id)
      .subscribe({
        next: () => {
          this.getTournaments()
        }
      })
  }

  checkStatus(date: Date, id: number) {
    //status = 0 --> nog niet afgelopen
    //status = 1 --> afgelopen en nog geen winnaar
    //status = 2 --> afgelopen en een winnaar

    //werkt voor geen meter!!!
    console.log("test" + date + " versus " + this.date)

    if (date > this.date) {
      return 0
    }
    if (date <= this.date) {
      return 1
    }
  }

  editTournament(id: number) {
    this.router.navigateByUrl("/tournament/" + id);
  }

  ngOnInit(): void {
    this.getTournaments();
    this.date = new Date();
    console.log(this.date)

  }

  getGroups() {
    this._groupService.getGroups().subscribe(
      result => {
        this.groups = result;
      }
    )
  }

  getCompetitions() {
    this._competitionService.getCompetitions().subscribe(
      result => {
        this.competitions = result;
      }
    )
  }
}

