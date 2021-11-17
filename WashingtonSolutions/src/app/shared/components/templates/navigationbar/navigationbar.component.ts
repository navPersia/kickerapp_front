import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/core/services/file.service';
import { AccountService } from '../../../../core/services/account.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss']
})
export class NavigationbarComponent implements OnInit {
  user: User;
  imageUrl: string;

  navUser = [
    { link: '/user/games', title: 'Mijn wedstrijden' },
    { link: '/user/challenge', title: 'Mijn challenges' },
    { link: '/user/profile/edit', title: 'Mijn profiel' }
  ]
  navCaptain = [
    { link: '/captain', title: 'Ploeg beheren' }
  ]
  navAdmin = [
    { link: '/admin/user/list', title: 'Gebruikers' },
    { link: '/admin/game/list', title: 'Wedstrijden' },
    { link: '/admin/table', title: 'Voetbaltafels' },
    { link: '/group', title: 'Ploegen' },
    { link: '/admin/competition', title: 'Competities' },
    { link: '/tournament', title: 'Tournooien' }
  ]

  constructor(
    public accountService: AccountService,
    private fileService: FileService
  ) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.fileService.getFile(x.userPictureID)
        .subscribe(x => this.imageUrl = environment.apiUrl.slice(0,-3) + x.path);
    });
   }

  ngOnInit(): void {
  }

  logout () {
    this.accountService.logout();
  }

}
