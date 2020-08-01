import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {getIsAuthenticated, State} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  constructor(private store:Store<State>, private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(getIsAuthenticated);
    }

  onTogglesideNav(){
    this.sideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }


}
