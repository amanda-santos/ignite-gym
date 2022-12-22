import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextProps = {
  user: UserDTO;
  signIn: (email: UserDTO["email"], password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({
    id: "1",
    name: "Rodrigo",
    email: "rodrigo@email.com",
    avatar: "rodrigo.png",
  });

  const signIn: AuthContextProps["signIn"] = async (email, password) => {
    try {
      console.log(user);

      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
      }

      console.log(user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
