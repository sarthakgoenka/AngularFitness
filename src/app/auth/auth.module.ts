import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {StopTrainingComponent} from "../training/current-training/stop-training.component";



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports:[

  ],
  entryComponents: [StopTrainingComponent]
})
export class AuthModule { }
