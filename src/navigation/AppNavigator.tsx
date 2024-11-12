import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator () {
  // const { isAuthenticated } = useSelector((state: any) => state);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainNavigator /> : <AuthNavigator />} */}
      <MainNavigator/>
    </NavigationContainer>
  );
}
