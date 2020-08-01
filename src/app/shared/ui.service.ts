import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private snackBar:MatSnackBar) { }

  showSnackBar(message, action, duration){
    this.snackBar.open(message, action, {
      duration: duration
    })
  }
}
