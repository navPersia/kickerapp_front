import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { Group } from 'src/app/shared/models/group.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';



@Component({
  selector: 'app-make-group',
  templateUrl: './make-group.component.html',
  styleUrls: ['./make-group.component.scss']
})
export class MakeGroupComponent implements OnInit {
  groupItem: Group;
  closeResult = '';
  newGroup: any;
  invalidModify: boolean;
  succes: boolean;
  notSucces: boolean;
  user: User;
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    public accountService: AccountService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });
    if(this.user.groupID !== null){    
      let id = this.user.groupID;
      this.getGroup(id);
    }
    console.log(this.user);
  }

  aad(x){
    console.log("testAdd");
    console.log(x);
    return this.http.post(`${environment.apiUrl}/groups`,
    x).subscribe(result => {
      if (result){
        this.ngOnInit();
        this.succes = true; 
        this.notSucces = false;
      }
      else{
        this.succes = false; 
        this.notSucces = true;
      }
      this.newGroup = result;
      console.log(this.newGroup.groupID);
      this.user.groupID = this.newGroup.groupID;
      console.log(this.user);


      let ngbDate = x.dob;
      let date = this.ngbDateParserFormatter.format(ngbDate);
    console.log(date);
    var updateUser = {
      roleID: this.user.roleID,
      username: this.user.username,
      password: x.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      userID: this.user.userID,
      userPictureID: 1,
      groupID: this.user.groupID
    }
    console.log(updateUser);
      this.accountService.update(this.user.userID, updateUser)
      .pipe(first())
      .subscribe({
        next: () => {
           this.ngOnInit();
        this.succes = true; 
        this.notSucces = false;
        },
        error: error => {
          console.log(error);
          this.succes = false; 
        this.notSucces = true;
        }
      });
    });
  }

  getGroup(id){
    this.http.get<any>(`${environment.apiUrl}/groups/` + id).subscribe(
      response => {
        console.log(response);
        this.groupItem = response;
      }
    );
  }
}
