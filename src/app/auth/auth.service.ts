import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import {State} from "../app.reducer";
import {StartLoading, StopLoading} from "../shared/ui.actions";
import {SetAuthenticated, SetUnauthenticated} from "./auth.actions";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private afAuth:AngularFireAuth, private trainingService:TrainingService,
              private _snackBar: MatSnackBar, private uiService:UiService,
              private store:Store<State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
        this.store.dispatch(new SetUnauthenticated());
      }
    });
  }

  registerUser(authData:AuthData){
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new StopLoading());


      })
      .catch(err=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new StopLoading());
        this.uiService.showSnackBar(err.message,null, 3000);
      })

  }
  login(authData){
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new StartLoading());


    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new StopLoading());
        console.log(result);
      })
      .catch(err=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new StopLoading());
        this.uiService.showSnackBar(err.message,null, 3000);
      });
  }
  logout(){
    this.afAuth.signOut();

  }

}
