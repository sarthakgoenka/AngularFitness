import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getIsAuthenticated, State} from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store:Store<State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuthenticated);

  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }



}
