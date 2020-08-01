import {ActivatedRouteSnapshot, CanActivate, Route,RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, pipe} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getIsAuthenticated, State} from "../app.reducer";
import {take} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor( private store:Store<State>) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(getIsAuthenticated).pipe(take(1));
  }
  canLoad(route:Route){
    return this.store.select(getIsAuthenticated).pipe(take(1))

  }
}
