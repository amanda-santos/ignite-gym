import { Center, Image, Text, VStack } from "native-base";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export const SignIn = () => {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={backgroundImg}
        alt="People working out"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Train your mind and body.
        </Text>
      </Center>
    </VStack>
  );
};
