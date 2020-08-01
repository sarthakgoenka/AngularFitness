import { Injectable } from '@angular/core';
import {Exercise} from "./exercise.model";
import {Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {UiService} from "../shared/ui.service";

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  constructor(private db: AngularFirestore, private uiService:UiService) {
  }

  private runningExercise:Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private exercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(
      map(docArray=>{
        // throw (new Error())
        return docArray.map(doc=>{
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
            // name: 'sarthak',
            // duration : 140,
            // calories: 3
          }
        })
      })).subscribe((result:Exercise[])=>{
      this.uiService.loadingStateChanged.next(false);
      this.availableExercises = result;
        console.log(this.availableExercises);
        this.exercisesChanged.next([...this.availableExercises]);
    }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Fetching Exercise failed, Please try again later', null, 3000)
      this.exercisesChanged.next(null);
      }))
  }

  startExercise(selectedId:string){
    this.runningExercise = this.availableExercises.find(ex=> ex.id ===selectedId);
    console.log(this.runningExercise);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExercise, state: 'completed', date: new Date()})
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  canceledExercise(progress:number){
    this.addDataToDatabase({...this.runningExercise,
      state: 'cancelled',
      date: new Date(),
      duration: this.runningExercise.duration*progress/100,
    calories: this.runningExercise.calories*progress/100})
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise:Exercise){
    this.db.collection('finishedExercise').add(exercise);
  }
  getRunningExercises(){
    return {...this.runningExercise}
  }

  fetchCompletedOrCancelledExercise(){
    this.fbSubs.push(this.db.collection('finishedExercise').valueChanges().subscribe((exercises:Exercise[])=>{
      this.finishedExercisesChanged.next(exercises);
    }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }


}

