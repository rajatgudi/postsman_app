"use client";
import { GetCurrentUserResponse } from "@/types/api.types";
import React, { createContext, useContext } from "react";
type AuthState =
  | {
      isAuthenticated?: boolean | undefined;
      token?: string;
      user?: GetCurrentUserResponse;
      login?: (token: string) => void;
      logout?: () => void;
      setUsers?: (user: GetCurrentUserResponse) => void;
    }
  | undefined;

// Create the Auth Context
const AuthContext = createContext<AuthState | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    isAuthenticated: false,
  });
  const setUsers = (user?: GetCurrentUserResponse) => {
    if (user) {
      setAuthState((prev) => ({
        ...prev,
        user: user || null,
      }));
    }
  };
  const login = (token?: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthState({ isAuthenticated: true, token });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ isAuthenticated: false });
  };

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthState({ isAuthenticated: true, token: storedToken });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
