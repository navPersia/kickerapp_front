import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  user: User;
  
  constructor(private router: Router,private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
   }

   canActivate(){
    if (this.user && this.accountService.isUser()) return true;
    if (this.user && this.accountService.isCaptain()) return true;

    this.router.navigate(["/no-access"]);
    return false;
  }


}
