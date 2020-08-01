import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {getFinishedExercises, State} from "../../app.reducer";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  ex:Exercise[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService,private store: Store<State>) {}

  ngOnInit() {
    this.store.select(getFinishedExercises).subscribe((exercises:Exercise[])=>{
      this.dataSource.data = exercises;
      console.log(exercises);
    })
    this.trainingService.fetchCompletedOrCancelledExercise();
    // this.dataSource.data = this.trainingService.getExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.data);
  }

  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
