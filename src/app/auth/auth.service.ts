import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import {State} from "../app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private afAuth:AngularFireAuth, private trainingService:TrainingService,
              private _snackBar: MatSnackBar, private uiService:UiService,
              private store:Store<{ui: State}>) {
  }
  authChange = new Subject<boolean>()
  isAuthenticated:boolean = false;

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData:AuthData){
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type:'START_LOADING'});
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type:'STOP_LOADING'});


      })
      .catch(err=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type:'STOP_LOADING'});
        this.uiService.showSnackBar(err.message,null, 3000);
      })

  }
  login(authData){
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type:'START_LOADING'});


    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type:'STOP_LOADING'});
        console.log(result);
      })
      .catch(err=>{
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type:'STOP_LOADING'});
        this.uiService.showSnackBar(err.message,null, 3000);
      });
  }
  logout(){
    this.afAuth.signOut();

  }

  isAuth(){
    return this.isAuthenticated;
  }
}
