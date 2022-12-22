import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_STORAGE } from "@storage/config";

export const save = async (token: string) => {
  await AsyncStorage.setItem(AUTH_STORAGE, token);
};

export const get = async () => {
  const token = await AsyncStorage.getItem(AUTH_STORAGE);

  return token;
};

export const remove = async () => {
  await AsyncStorage.removeItem(AUTH_STORAGE);
};
