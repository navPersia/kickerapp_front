import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './modules/home/homepage/homepage.component';
import { Error404Component } from './shared/components/error/error404/error404.component';
import { LoginComponent } from './modules/home/login/login.component';
import { TableComponent } from './modules/admin/table/table/table.component';
import { NewTableComponent } from './modules/admin/table/new-table/new-table.component';
import { EditTableComponent } from './modules/admin/table/edit-table/edit-table.component';
import { ManageCompetitionComponent } from './modules/admin/competition/manage-competition/manage-competition.component';
import { AddCompetitionComponent } from './modules/admin/competition/add-competition/add-competition.component';
import { EditCompetitionComponent } from './modules/admin/competition/edit-competition/edit-competition.component';
import { RegisterComponent } from './modules/home/register/register.component';
import { TournamentComponent } from './modules/admin/tournament/tournament/tournament.component';
import { NewTournamentComponent } from './modules/admin/tournament/new-tournament/new-tournament.component';
import { ListComponent as UserListComponent } from './modules/admin/user/list/list.component';
import { DetailComponent as UserDetailComponent } from './modules/admin/user/detail/detail.component';
import { ListComponent as GameListComponent } from './modules/admin/game/list/list.component';
import { GroupComponent } from './modules/admin/group/group.component';
import { EditComponent as ProfileEditComponent } from './modules/user/profile/edit/edit.component';
import { DetailComponent as GameDetailComponent } from './modules/admin/game/detail/detail.component';
import { ShowScoreComponent } from './modules/user/show-score/show-score.component';
import { CreateTeamComponent } from './modules/user/create-team/create-team.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { UserAuthGuard } from './core/guards/user-auth-guard.service';
import { AdminAuthGuard } from './core/guards/admin-auth-guard.service';
import { CaptainComponent } from './modules/captain/captain/captain.component';
import { GameComponent } from './modules/user/games/game.component';
import { UserGameDetailComponent } from './modules/user/games/details/user-game-detail/user-game-detail.component';
import { ChallengesComponent } from './modules/user/games/challenges/challenges.component';
import { NewChallengeComponent } from './modules/user/games/new-challenge/new-challenge.component';


import { Error403Component } from './shared/components/error/error403/error403.component';
import { MakeGroupComponent } from './modules/user/make-group/make-group.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent},
  
  { path: 'register', component: RegisterComponent },
  { path: 'captain', component: CaptainComponent },
  
  { path: 'admin/user/list', component: UserListComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/user/edit/:id', component: UserDetailComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/user/add', component: UserDetailComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  
  { path: 'admin/competition', component: ManageCompetitionComponent, canActivate: [AdminAuthGuard, AuthGuard]},
  { path: 'admin/competition/add', component: AddCompetitionComponent, canActivate: [AdminAuthGuard, AuthGuard]},
  { path: 'admin/competition/edit/:id', component: EditCompetitionComponent, canActivate: [AdminAuthGuard, AuthGuard]},

  { path: 'admin/game/list', component: GameListComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/game/edit/:id', component: GameDetailComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/game/add', component: GameDetailComponent, canActivate: [AdminAuthGuard, AuthGuard] },

  { path: 'user/profile/edit',
    component: ProfileEditComponent,
    canActivate: [UserAuthGuard, AuthGuard]},

  { path: 'admin/table', component: TableComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/table/add', component: NewTableComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/table/edit/:id', component: EditTableComponent, canActivate: [AdminAuthGuard, AuthGuard] },

  { path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard] },
  { path: 'tournament/add', component: NewTournamentComponent, canActivate: [AuthGuard] },
  { path: 'tournament/:id', component: NewTournamentComponent, canActivate: [AuthGuard] },
  { path: 'user/profile/edit', component: ProfileEditComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'user/games' , component: GameComponent, canActivate: [UserAuthGuard ,AuthGuard]},
  { path: 'user/games/edit/:id', component: UserGameDetailComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'user/challenge', component: ChallengesComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'user/challenge/new', component: NewChallengeComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  
  { path: 'table', component: TableComponent },
  { path: 'table/add', component: NewTableComponent },
  { path: 'table/:id', component: EditTableComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'tournament/add', component: NewTournamentComponent },
  { path: 'tournament/:id', component: NewTournamentComponent },
  //TODO: childrenroutes

  { path: 'group', component: GroupComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'user/show_score', component: ShowScoreComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'user/create_team', component: CreateTeamComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'user/make-group', component: MakeGroupComponent, canActivate: [UserAuthGuard ,AuthGuard] },
  { path: 'no-access', component: Error403Component },

  //moet laatst blijven staan.
  { path: '**', component: Error404Component },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
