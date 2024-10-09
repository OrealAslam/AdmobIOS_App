import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainRoute from './MainRoute';
import BoardingLanguageScreen from '../screens/BoardingLanguageScreen';
import Screen1 from '../screens/Screen1';
import BoardingDesclaimer from '../screens/BoardingDesclaimer';
import AdLoading from '../screens/AdLoading';
import { StatusBar } from 'react-native';
const Stack = createNativeStackNavigator();

StatusBar.setHidden(true);
export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BoardingLanguageScreen"
        component={BoardingLanguageScreen}
        options={{headerShown: false,animationenabled: false}}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{headerShown: false,animationenabled: false}}
      />
      <Stack.Screen
        name="BoardingDesclaimer"
        component={BoardingDesclaimer}
        options={{headerShown: false,animationenabled: false}}
      />
      <Stack.Screen
        name="AdLoading"
        component={AdLoading}
        options={{headerShown: false,animationenabled: false}}
        initialParams={{screen: 'boarding'}}
      />
      <Stack.Screen
        name="MainRoute"
        component={MainRoute}
        options={{headerShown: false,animationenabled: false}}
      />
    </Stack.Navigator>
  );
}