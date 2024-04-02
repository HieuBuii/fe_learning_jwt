import { AuthActionType, IAuthState, IPayloadAction } from "./type/auth.type";

export const initialize = (payload: IAuthState): IPayloadAction<IAuthState> => {
  return {
    type: AuthActionType.INITIALIZE,
    payload,
  };
};

export const signIn = (payload: IAuthState): IPayloadAction<IAuthState> => {
  return {
    type: AuthActionType.SIGN_IN,
    payload,
  };
};

export const signOut = (): IPayloadAction<IAuthState> => {
  localStorage.removeItem("ACCESS_TOKEN");
  return {
    type: AuthActionType.SIGN_OUT,
    payload: { user: null },
  };
};
