import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './shared/components/error/error404/error404.component';
import { Error403Component } from './shared/components/error/error403/error403.component';

import { FooterComponent } from './shared/components/templates/footer/footer.component';
import { NavigationbarComponent } from './shared/components/templates/navigationbar/navigationbar.component';

import { AlertComponent } from './shared/components/alert/alert.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionModule } from './modules/admin/competition/competition.module';
import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/admin/user/user.module';
import { LoginComponent } from './modules/home/login/login.component';
import { TableModule } from './modules/admin/table/table.module';
import { TournamentModule } from './modules/admin/tournament/tournament.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameModule } from './modules/admin/game/game.module';
import { UserGameModule } from './modules/user/games/game.module';
import { GroupComponent } from './modules/admin/group/group.component';
import { ProfileModule } from './modules/user/profile/profile.module';
import { ShowScoreComponent } from './modules/user/show-score/show-score.component';
import { CreateTeamComponent } from './modules/user/create-team/create-team.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { UserAuthGuard } from './core/guards/user-auth-guard.service';
import { AdminAuthGuard } from './core/guards/admin-auth-guard.service';
import { CaptainModule } from './modules/captain/captain.module';
import { MakeGroupComponent } from './modules/user/make-group/make-group.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error403Component,

    FooterComponent,
    NavigationbarComponent,

    AlertComponent,
    GroupComponent,
    ShowScoreComponent,
    CreateTeamComponent,
    MakeGroupComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TableModule,
    TournamentModule,
    NgbModule,
    CompetitionModule,
    HomeModule,
    UserModule,
    GameModule,
    ProfileModule,
    CaptainModule,
    UserGameModule,
    ProfileModule

  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard,
    UserAuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
