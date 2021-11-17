import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptainComponent } from './captain/captain.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [CaptainComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CaptainComponent]
})
export class CaptainModule { }
