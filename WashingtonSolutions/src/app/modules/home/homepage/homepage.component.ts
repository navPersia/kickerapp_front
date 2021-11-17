import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  user: User;


  constructor(private _accountService: AccountService, private router: Router) {
    this._accountService.user.subscribe(result => this.user = result);
  }

  ngOnInit(): void {
  }

  redirectTo(route) {
    this.router.navigateByUrl("/" + route);
  }

}
