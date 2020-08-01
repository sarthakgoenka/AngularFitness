import { Component, OnInit } from '@angular/core';
import {TrainingService} from "./training.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getIsTraining, State} from "../app.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
ongoingTrainig$ : Observable<boolean>;
  constructor(private trainingService:TrainingService, private store:Store<State>) { }

  ngOnInit() {
    this.ongoingTrainig$ = this.store.select(getIsTraining);
  }

}
