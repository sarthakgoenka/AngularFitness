import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth:boolean = false;
  authSubscription:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus=>{
        this.isAuth = authStatus;
    })
  }

  onTogglesideNav(){
    this.sideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
