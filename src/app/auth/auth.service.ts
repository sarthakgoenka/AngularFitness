import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private afAuth:AngularFireAuth, private trainingService:TrainingService) {
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
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
      })
      .catch(err=>{
        console.log(err);
      })

  }
  login(authData){
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        console.log(result);
      })
      .catch(err=>{
        console.log(err);
      });
  }
  logout(){
    this.afAuth.signOut();

  }

  isAuth(){
    return this.isAuthenticated;
  }
}
