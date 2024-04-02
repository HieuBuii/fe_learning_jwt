import { Dispatch } from "react";
import { IUser } from "../../utils/schemas";

export interface IAuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user: IUser | null;
}

export enum AuthActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export interface IPayloadAction<T> {
  type: AuthActionType;
  payload: T;
}

export interface IAuthContextType extends IAuthState {
  dispatch: Dispatch<IPayloadAction<IAuthState>>;
}

export interface IAuthReducer {
  INITIALIZE(state: IAuthState, action: IPayloadAction<IAuthState>): IAuthState;
  SIGN_IN(state: IAuthState, action: IPayloadAction<IAuthState>): IAuthState;
  SIGN_OUT(state: IAuthState): IAuthState;
}
