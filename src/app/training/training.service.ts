import { Injectable } from '@angular/core';
import {Exercise} from "./exercise.model";
import {Subject, Subscription} from "rxjs";
import {map, take} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {UiService} from "../shared/ui.service";
import {getActiveTraining, State} from "../app.reducer";
import {Store} from "@ngrx/store";
import {StartLoading, StopLoading} from "../shared/ui.actions";
import {SetAvailableTrainings, SetFinishedTrainings, StartTraining, StopTraining} from "./training.actions";

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  constructor(private db: AngularFirestore, private uiService:UiService, private store:Store<State>) {
  }

  private runningExercise:Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private exercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  fetchAvailableExercises() {
    this.store.dispatch(new StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(
      map(docArray=>{
        return docArray.map(doc=>{

          const data = doc.payload.doc.data() as Exercise;
          const id = doc.payload.doc.id;
          return {id:doc.payload.doc.id, ...data};



          // return  {
          //   id: doc.payload.doc.id,
          //   name: doc.payload.doc.data().name,
          //   duration: doc.payload.doc.data().duration,
          //   calories: doc.payload.doc.data().calories
          // };
        })
      })).subscribe((result:Exercise[])=>{
      this.store.dispatch(new StopLoading());
        this.store.dispatch(new SetAvailableTrainings(result));
    }, error => {
      this.store.dispatch(new StopLoading());
        this.uiService.showSnackBar('Fetching Exercise failed, Please try again later', null, 3000)
      this.exercisesChanged.next(null);
      }))
  }

  startExercise(selectedId:string){
    this.store.dispatch(new StartTraining(selectedId));

  }

  completeExercise(){
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex=>{
      this.addDataToDatabase({...ex, state: 'completed', date: new Date()})
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    });

  }

  canceledExercise(progress:number){
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex=>{
      this.addDataToDatabase({...ex,
        state: 'cancelled',
        date: new Date(),
        duration: ex.duration*progress/100,
        calories: ex.calories*progress/100})
      this.store.dispatch(new StopTraining());
    });


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
      this.store.dispatch(new SetFinishedTrainings(exercises));

    }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }


}

