import { TouchableOpacity } from "react-native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={6}
          alignItems="center"
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
            }}
            alt="Exercise name"
            mb={8}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  3 series
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  12 repetitions
                </Text>
              </HStack>
            </HStack>

            <Button title="Mark as finished" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};