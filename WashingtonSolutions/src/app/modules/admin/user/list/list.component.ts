import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { GroupService } from 'src/app/core/services/group.service';
import { Group } from 'src/app/shared/models/group.model';
import { AccountService } from '../../../../core/services/account.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Role } from '../../../../shared/models/role.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users = null;
  roles;
  groups;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private groupService: GroupService
    ) { }

  ngOnInit(): void {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
    
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => console.log(users));

    this.accountService.getRoles().subscribe(
      result => {
        this.roles = result;
      }
    )

    this.groupService.getGroups().subscribe(
      result => {
        this.groups = result;
      }
    )
  }

  deleteUser (id: number) {
    const user = this.users.find(x => x.userID === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter(x => x.userID !== id);
        this.alertService.success('Gebruiker succesvol verwijderd');
      });
  }

}
