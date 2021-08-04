import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {AuthProvider} from './src/context/authContext';

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
}
