import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { GameType } from 'src/app/shared/models/game-type.model';
import { Group } from 'src/app/shared/models/group.model';
import { CompetitionService } from '../../../../core/services/competition.service';

@Component({
  selector: 'app-manage-competition',
  templateUrl: './manage-competition.component.html',
  styleUrls: ['./manage-competition.component.scss']
})
export class ManageCompetitionComponent implements OnInit {

  competitions: Competition[];
  gameTypes: GameType[];
  groups: Group[];

  constructor(private _competitionService: CompetitionService, private router: Router, private route: ActivatedRoute) {
    this.getCompetitions();
    this.getGameTypes();
    this.getGroups();
  }

  ngOnInit(): void {
  }

  getCompetitions() {
    // subscribe to GET competitions
    this._competitionService.getCompetitions().subscribe(
      result => {
        this.competitions = result;
      }
    )
  };

  getGameTypes() {
    // subscribe to GET gameTypes
    this._competitionService.getGameTypes().subscribe(
      result => {
        this.gameTypes = result;
      }
    )
  };

  getGroups() {
    // subscribe to GET groups
    this._competitionService.getGroups().subscribe(
      result => {
        this.groups = result;
      }
    )
  }

  editCompetition(id) {
    this.router.navigateByUrl("/admin/competition/edit/" + id);
  };

  deleteCompetition(id) {
    var competitionID: number = + id;
    // subscribe to DELETE competitions
    this._competitionService.deleteCompetition(competitionID).subscribe({
      next: () => {
        this.getCompetitions()
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl('/admin/competitions');
      },
      error: error => {
        console.log(error);
      }
    });
  };

};
