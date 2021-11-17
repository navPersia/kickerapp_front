import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { UserGameDetailComponent } from './details/user-game-detail/user-game-detail.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { NewChallengeComponent } from './new-challenge/new-challenge.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GameComponent, UserGameDetailComponent, ChallengesComponent, NewChallengeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserGameModule { }
