import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getIsLoading, State} from "../../app.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  lodinsSub: Subscription;
  constructor(private authService:AuthService, private uiService:UiService, private store:Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
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

}
