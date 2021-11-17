import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { Competition } from 'src/app/shared/models/competition.model';
import { GameType } from 'src/app/shared/models/game-type.model';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.scss']
})
export class AddCompetitionComponent implements OnInit {

  gameTypes: GameType[];
  competition = new Competition(0,null,null,null);

  constructor(private _competitionService: CompetitionService, private router: Router, private route: ActivatedRoute) { 
    // subscribe to GET gameTypes
    this._competitionService.getGameTypes().subscribe(
      result => {
        this.gameTypes = result;
      }
    )
  }

  ngOnInit(): void {
  }

  addCompetition(){
    var gameTypeID: number = + this.competition.gameTypeID;
    var c = new Competition(0, this.competition.name, gameTypeID, null);

    // subscribe to POST competition
    this._competitionService.postCompetition(c).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl('/admin/competition');
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
