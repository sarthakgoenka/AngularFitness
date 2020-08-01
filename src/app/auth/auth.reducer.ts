import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from "./auth.actions";

export interface State {
  isAutheticated:boolean
}
const initialState:State = {
  isAutheticated: false

}
export function authReducer(state = initialState, action:AuthActions){
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAutheticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAutheticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state:State)=> state.isAutheticated;
