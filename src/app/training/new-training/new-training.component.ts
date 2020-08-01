import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy{
  @Output() trainingStart =  new EventEmitter();
  exercises: Exercise[];
  exerciseSubscription:Subscription;
  isLoading = true;
  constructor(private trainingService:TrainingService, private uiService:UiService) { }

  ngOnInit(){
    this.exerciseSubscription =  this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.uiService.loadingStateChanged.subscribe(result=>{
      this.isLoading = result;
      this.fetchExercises();
    })

  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();

  }
  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
