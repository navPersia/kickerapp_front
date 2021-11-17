import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [HomepageComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [HomepageComponent, LoginComponent, RegisterComponent]
})
export class HomeModule { }
