import { Injectable } from '@angular/core';
import {Exercise} from "./exercise.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  private runningExercise:Exercise;
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId:string){
    this.runningExercise = this.availableExercises.find(ex=> ex.id ===selectedId);
    console.log(this.runningExercise);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.exercises.push({...this.runningExercise, state: 'completed', date: new Date()})
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  canceledExercise(progress:number){
    this.exercises.push({...this.runningExercise,
      state: 'cancelled',
      date: new Date(),
      duration: this.runningExercise.duration*progress/100,
    calories: this.runningExercise.calories*progress/100})
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercises(){
    return {...this.runningExercise}
  }

  getExercises(){
    return this.exercises.slice();
  }
  constructor() { }
}
3
