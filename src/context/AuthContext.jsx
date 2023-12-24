import { createContext,  useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function AuthReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,user: null,
        isAuthenticated: false,
      };
    default: {
      throw new Error("failed to log in");
    }
  }
}
const FAKE_USER = {
  name: "Sepehr",
  email: "sepehrshapouri@gmail.com",
  password: "1234",
};
export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    AuthReducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password){
      toast.success("logged in successfully")
      dispatch({ type: "login", payload: FAKE_USER });
    }
    if(email != "" && email != FAKE_USER.email || password != "" && password != FAKE_USER.password)
    toast.error("wrong credentials")
  }
  function logout() {
    dispatch({ type: "logout" });
    toast.success("logged out successfully")
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
