import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE } from "./storageConfig";

export const save = async (user: UserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};
