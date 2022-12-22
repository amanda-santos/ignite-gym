import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

import * as userStorage from "@storage/userStorage";
import * as authStorage from "@storage/authStorage";

export type AuthContextProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (email: UserDTO["email"], password: string) => Promise<void>;
  signOut: () => Promise<void>;
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

  const updateToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const updateUser = (userData: UserDTO) => {
    setUser(userData);
  };

  const saveOnStorage = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true);

      await userStorage.save(userData);
      await authStorage.save(token);

      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signIn: AuthContextProps["signIn"] = async (email, password) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
      const { user, token } = data;

      if (user && token) {
        await saveOnStorage(user, token);
        updateToken(token);
        updateUser(user);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      updateUser({} as UserDTO);
      await userStorage.remove();
      await authStorage.remove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const loadUserData = async () => {
    try {
      const loggedUser = await userStorage.get();

      if (loggedUser) {
        updateUser(loggedUser);
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
    <AuthContext.Provider
      value={{ user, isLoadingUserStorageData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
