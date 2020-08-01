import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training.component";
import {TrainingService} from "../training.service";
import {Store} from "@ngrx/store";
import {getActiveTraining, State} from "../../app.reducer";
import {take} from "rxjs/operators";

  @Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
  })
  export class CurrentTrainingComponent implements OnInit {
      progress:number =0;
      timer:number;
    constructor(public  dialog: MatDialog, private trainingService:TrainingService, private store: Store<State>) { }

    ngOnInit() {
      this.startOrResumeTimer();
    }

    startOrResumeTimer(){
      this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex=>{
        const step = ex.duration/100*1000;
        this.timer = setInterval(()=>{
          this.progress = this.progress+5;
          if(this.progress>=100){
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        },step)
      });

    }

    onStopTimer(){
      clearInterval(this.timer);
      const dialogRef  = this.dialog.open(StopTrainingComponent , {data:{progress: this.progress}});
      dialogRef.afterClosed().subscribe((result)=> {
        if(result){
          this.trainingService.canceledExercise(this.progress);
        }
        else{
          this.startOrResumeTimer();
        }
      });
    }
  }
