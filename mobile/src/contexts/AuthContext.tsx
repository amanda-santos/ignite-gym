import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import * as userStorage from "@storage/userStorage";

export type AuthContextProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (email: UserDTO["email"], password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const signIn: AuthContextProps["signIn"] = async (email, password) => {
    try {
      console.log(user);

      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        userStorage.save(data.user);
      }

      console.log(user);
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const userLogged = await userStorage.get();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingUserStorageData, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
