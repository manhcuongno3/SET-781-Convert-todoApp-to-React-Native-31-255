import { NativeBaseProvider } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  useColorScheme
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/utils/constants';

export default function App () {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? colors.dark.background
      : colors.light.background,
  };

  return (
      <NativeBaseProvider>
              <AppNavigator />
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
