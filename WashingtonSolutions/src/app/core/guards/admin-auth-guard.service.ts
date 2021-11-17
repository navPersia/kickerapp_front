import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  user: User;
  
  constructor(
    private router: Router,
    public accountService: AccountService
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  canActivate(){
    
    if (this.user && this.accountService.isAdmin()) return true;

    this.router.navigate(["/no-access"]);
    return false;
  }
}
