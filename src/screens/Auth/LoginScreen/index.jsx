import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  useToast
} from 'native-base';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI } from '../../apis';
import { login } from '../../redux/userActions';
import { message_error, setToastContent, toastStatus, toastTitle } from '../../../utils/constants';

export default function LoginScreen({ navigation }) {
  const { handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

  async function onSubmit(values) {
    try {
      const loginResult = await loginAPI({
        email: values?.email,
        password: values?.password
      });

      if (loginResult) {
        const { data } = loginResult?.data;
        dispatch(login(data));
        if (values?.rememberMe) {
          await AsyncStorage.setItem('authToken', data?.token);
        } else {
          await AsyncStorage.setItem('authToken', data?.token);
        }
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response) {
        if (error.response?.status === axios.HttpStatusCode.NotFound) {
          setError('email', {
            type: 'manual',
            message: error.response.data.message
          });
        } else if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
          setError('password', {
            type: 'manual',
            message: error.response.data.message
          });
        }
      } else {
        toast.show(setToastContent(toastTitle.ERROR, message_error.INTERNAL_SERVER_ERROR, toastStatus.ERROR));
      }
    }
  }

  return (
    <HStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="white"
    >
      <Box width="90%" maxW="400px">
        <VStack
          as="form"
          space={4}
          alignItems="stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <VStack space={2} alignItems="start">
            <Heading fontSize="2xl">Welcome back!</Heading>
            <Text fontSize="md">Login to Get Started</Text>
          </VStack>

          <VStack space={4}>
            <FormControl isInvalid={'email' in errors}>
              <FormControl.Label>Email Address</FormControl.Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'This field can not be empty',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: 'Invalid email format'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="text"
                    placeholder="name@example.com"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {errors.email && errors.email.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={'password' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'This field can not be empty'
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="password"
                    placeholder="Enter password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {errors.password && errors.password.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>

          <VStack space={4} alignItems="start">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  colorScheme="teal"
                  isChecked={value}
                  onChange={onChange}
                >
                  Remember Me
                </Checkbox>
              )}
            />

            <Button
              colorScheme="teal"
              width="100%"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            >
              Login
            </Button>

            <Text textAlign="center">
              Don&apos;t have an account?{' '}
              <Text
                color="teal.500"
                onPress={() => navigation.navigate('Register')}
              >
                Register here
              </Text>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
}
