import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 32;

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/amanda-santos.png"
  );
  const toast = useToast();

  const handleSelectUserPhoto = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const { uri: photoUri } = photoSelected.assets[0];

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 2) {
          return toast.show({
            title: "This image is too big. Choose one up to 2MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhoto(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleSelectUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Update profile picture
            </Text>
          </TouchableOpacity>

          <Input bg="gray.600" placeholder="Name" />

          <Input bg="gray.600" placeholder="Email" isDisabled />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Change password
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Previous password"
            secureTextEntry
          />

          <Input bg="gray.600" placeholder="New password" secureTextEntry />

          <Input
            bg="gray.600"
            placeholder="Confirm your new password"
            secureTextEntry
          />

          <Button title="Save" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
};
