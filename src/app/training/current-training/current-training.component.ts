import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training.component";
import {TrainingService} from "../training.service";

  @Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
  })
  export class CurrentTrainingComponent implements OnInit {
      progress:number =0;
      timer:number;
    constructor(public  dialog: MatDialog, private trainingService:TrainingService) { }

    ngOnInit() {
      this.startOrResumeTimer();
    }

    startOrResumeTimer(){
      const step = this.trainingService.getRunningExercises().duration/100*1000;
      // console.log(this.trainingService.getRunningExercises().calories);
      this.timer = setInterval(()=>{
        this.progress = this.progress+5;
        if(this.progress>=100){
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      },step)
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
