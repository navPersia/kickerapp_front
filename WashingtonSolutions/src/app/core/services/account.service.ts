import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { NewUser } from '../../shared/models/new-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  user1: User;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    this.user.subscribe(x => this.user1 = x);
  }

  public get userValue (): User {
    return this.userSubject.value;
  }

  login (username, password) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout () {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    //this.router.navigate(['/login']);
  }

  register (user: NewUser) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getAll () {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById (id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getUser() {
    return this.http.get<User>(`${environment.apiUrl}/users/${this.userValue.userID}`);
    //gemaakt voor UserTeams te testen
  }

  getByGroupId(id: number) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/GetByGroup/${id}`);
  }

  getWithoutGroup() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/WithoutGroup/`);
  }

  update (id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.userID) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  patch (id, params) {
    return this.http.patch(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.userID) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete (id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.userID) {
          this.logout();
        }
        return x;
      }));
  }

  isAdmin() { 
    if(this.user1){
      if (this.user1.role.name == "Admin"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  isUser() { 
    
    if(this.user1){
      if (this.user1.role.name == "User"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  isCaptain() { 
    if(this.user1){
      if (this.user1.role.name == "Captain"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  isLogedIn() { 
    if(this.user1){
        return true;
      }else{
        return false;
      }
  }

  kick(user: User) {
    user.groupID = null;
    return this.http.put(`${environment.apiUrl}/users/${user.userID}`, user)
  }

  addToGroup(user: User, groupID: number) {
    user.groupID = groupID;
    return this.http.put(`${environment.apiUrl}/users/${user.userID}`, user)
  }

  getRoles() {
    return this.http.get(`${environment.apiUrl}/roles`)
  }
}
