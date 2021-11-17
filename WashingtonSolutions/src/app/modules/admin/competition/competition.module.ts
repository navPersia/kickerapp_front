import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
;
import { ManageCompetitionComponent } from './manage-competition/manage-competition.component';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ManageCompetitionComponent, AddCompetitionComponent, EditCompetitionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
})

export class CompetitionModule { }
