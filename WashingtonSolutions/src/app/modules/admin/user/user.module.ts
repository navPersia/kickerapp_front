import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [ListComponent, DetailComponent]
})
export class UserModule { }
