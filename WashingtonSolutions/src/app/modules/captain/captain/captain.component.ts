import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../../core/services/account.service';
import { AlertService } from '../../../core/services/alert.service';
import { TeamService } from '../../../core/services/team.service';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../shared/models/team.model';
import { TeamUser } from '../../../shared/models/team-user.model';

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.scss']
})
export class CaptainComponent implements OnInit {

  form: FormGroup;
  formteams: FormGroup;
  users = null;
  user: User;
  teams: Team[];
  loading = false;
  noGroupUsers: User[];
  submitted = false;

  gebruikerView = true;


  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    private teamService: TeamService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    
  }

  ngOnInit(): void {
    console.log(this.user.groupID)
    this.getUsers()
    this.getTeams()


    this.form = this.formBuilder.group({
      userID: ['', Validators.required]
    });
    this.formteams = this.formBuilder.group({
      teamName: ['', Validators.required],
      userIDA: ['', Validators.required],
      userIDB: ['']
    });
  }
  /**
  kickUser(id: number) {
    const user = this.users.find(x => x.userID === id);
    user.isKicking = true;
    this.accountService.kick(user)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Gebruiker succesvol gekicked');
        //refresh list
        this.getUsers()
      });
    this.loading = false;
  }
  */
  getTeams() {
    this.teamService.getTeamsByGroup(this.user.groupID).subscribe(result => {
      this.teams = result;
    })
  }

  getUsers() {
    //lijst met gebruikers in groep
    this.accountService.getByGroupId(this.user.groupID)
      .pipe(first())
      .subscribe(users => this.users = users);
    //lijst met gebruikers zonder groep... Of toch niet!... Of toch wel!!!
    this.accountService.getWithoutGroup()
      .pipe(first())
      .subscribe(users => {
        this.noGroupUsers = users
        console.log(users)
      }
        )
  }

  onSubmitGebr() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.form.value.userID)

    this.accountService.getById(this.form.value.userID).subscribe(result => {

      //werkte vreemd genoeg niet anders
      this.accountService.addToGroup(result, this.user.groupID)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success('Gebruiker succesvol toegevoegd');
          //refresh list
          this.getUsers()
        });
      this.loading = false;

    })
  }

  onSubmitTeam() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formteams.invalid) {
      this.submitted = false;
      return;
    }

    if (this.formteams.value.userIDA === this.formteams.value.userIDB) {
      this.alertService.error("gebruiker A en B mogen niet overeenkomen")
      this.submitted = false;
      return;
    }

    this.loading = true;
    console.log(this.formteams.value.teamName)
    console.log(this.formteams.value.userIDA)
    console.log(this.formteams.value.userIDB)

    var team = new Team(0, this.formteams.value.teamName, this.user.groupID)
    console.log(team)
    this.teamService.addTeam(team).subscribe(result => {
      console.log(result)
      var team: any = result
      var teamID = team.teamID
      console.log(teamID)

      //gebruiker(s) toevoegen aan dit team.

      var teamUserA = new TeamUser(0, this.formteams.value.userIDA, teamID)
      this.teamService.addTeamUser(teamUserA).subscribe(res=>{
        console.log(res)
      })
      if (this.formteams.value.userIDB) {
        var teamUserB = new TeamUser(0, this.formteams.value.userIDB, teamID)
        this.teamService.addTeamUser(teamUserB).subscribe(res => {
          console.log(res)
        })
      }
      this.loading = false;
      this.submitted = false;
    })
  }


  gebruiksbtn() {
    this.gebruikerView = true
  }
  teamsbtn() {
    this.gebruikerView = false
  }

}
