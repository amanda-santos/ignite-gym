import { Image, VStack } from "native-base";

import backgroundImg from "@assets/background.png";

export const SignIn = () => {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={backgroundImg}
        alt="People working out"
        resizeMode="contain"
        position="absolute"
      />
    </VStack>
  );
};
