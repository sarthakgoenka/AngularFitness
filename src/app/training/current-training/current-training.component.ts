import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training.component";

  @Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
  })
  export class CurrentTrainingComponent implements OnInit {
      progress:number =0;
      timer:number;
      @Output() trainigExit = new EventEmitter();
    constructor(public  dialog: MatDialog) { }

    ngOnInit() {
      this.startOrResumeTimer();
    }

    startOrResumeTimer(){
      this.timer = setInterval(()=>{
        this.progress = this.progress+25;
        if(this.progress>=100){
          clearInterval(this.timer);
        }
      },1000)
    }

    onStopTimer(){
      clearInterval(this.timer);
      const dialogRef  = this.dialog.open(StopTrainingComponent , {data:{progress: this.progress}});
      dialogRef.afterClosed().subscribe((result)=> {
        if(result){
            this.trainigExit.emit();
        }
        else{
          this.startOrResumeTimer();
        }
      });
    }
  }
