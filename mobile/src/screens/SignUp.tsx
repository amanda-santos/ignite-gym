import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Inform your name"),
  email: yup.string().required("Inform your email").email("Invalid email"),
  password: yup
    .string()
    .required("Inform your password")
    .min(6, "The password must be at least 6 characters long."),
  password_confirm: yup
    .string()
    .required("Confirm your password.")
    .oneOf([yup.ref("password"), null], "The passwords don't match"),
});

export const SignUp = () => {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({ name, email, password }: FormDataProps) => {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log(response);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={backgroundImg}
          defaultSource={backgroundImg}
          alt="People working out"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Train your mind and body
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Create your account
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Sign up" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Button
          title="Go back to login page"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};
