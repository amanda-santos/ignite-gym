import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_STORAGE } from "@storage/config";

export const save = async (token: string) => {
  await AsyncStorage.setItem(AUTH_STORAGE, token);
};
