import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  lodinsSub: Subscription;
  constructor(private authService:AuthService, private uiService:UiService, private store:Store<{ui: State}>) {}

  ngOnInit() {
    this.store.subscribe(data=>console.log(data));
    this.lodinsSub = this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading = isLoading;
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    // console.log(this.loginForm);
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password });
  }

  ngOnDestroy(): void {
    this.lodinsSub.unsubscribe();
  }
}
