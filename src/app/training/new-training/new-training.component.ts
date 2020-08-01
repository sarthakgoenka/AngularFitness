import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";
import {getAvailableExercises, getIsLoading, State} from "../../app.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    this.exercises$ =  this.store.select(getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
