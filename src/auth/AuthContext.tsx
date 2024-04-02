import { createContext, useContext, useEffect, useReducer } from "react";
import { IAuthState, IAuthContextType } from "./type/auth.type";
import { authReducer } from "./authReducer";
import { initialize } from "./authActions";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const initialState: IAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<IAuthContextType>({
  ...initialState,
  dispatch: () => null,
});

export const AuthProvider = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      navigate("/login");
      return dispatch(initialize({ isAuthenticated: false, user: null }));
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
