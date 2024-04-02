import { IAuthReducer, IAuthState, IPayloadAction } from "./type/auth.type";

const authReducerHandlers: IAuthReducer = {
  INITIALIZE(
    state: IAuthState,
    action: IPayloadAction<IAuthState>
  ): IAuthState {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isInitialized: true,
      isAuthenticated,
      user,
    };
  },
  SIGN_IN(state: IAuthState, action: IPayloadAction<IAuthState>): IAuthState {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT(state: IAuthState): IAuthState {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

export function authReducer(
  state: IAuthState,
  action: IPayloadAction<IAuthState>
) {
  if (!authReducerHandlers[action.type]) return state;
  return authReducerHandlers[action.type](state, action);
}
