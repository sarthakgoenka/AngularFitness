import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy{
  maxDate;
  isLoading = false;
  lodinsSub: Subscription;
  constructor(private authService:AuthService, private uiService:UiService) { }

  ngOnInit() {
    this.lodinsSub = this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading = isLoading;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form:NgForm){
    // console.log(form);
    this.authService.registerUser({email: form.value.email, password: form.value.password});
  }
  ngOnDestroy(): void {
    this.lodinsSub.unsubscribe();
  }
}
