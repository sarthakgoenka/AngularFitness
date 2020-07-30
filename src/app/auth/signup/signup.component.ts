import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form:NgForm){
    // console.log(form);
    this.authService.registerUser({email: form.value.email, password: form.value.password});
  }

}
