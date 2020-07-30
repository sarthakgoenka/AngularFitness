import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy{
  @Output() trainingStart =  new EventEmitter();
  exercises: Exercise[];
  exerciseSubscription:Subscription;
  constructor(private trainingService:TrainingService) { }

  ngOnInit(){
    this.exerciseSubscription =  this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
