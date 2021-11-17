import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.scss']
})
export class ShowScoreComponent implements OnInit {
  user: User;
  

  constructor(
    private accountService: AccountService
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    // this.getUser();
  
  }

  getUser(){
    
  }

}
