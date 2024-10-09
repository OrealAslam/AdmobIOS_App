import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdLoading from '../screens/AdLoading';
import GraphAdLoading from '../screens/GraphAdLoading';
import LandingScreen from '../screens/LandingScreen';
import BloodSugar from '../screens/bloodsugar/BloodSugar';
import ResultScreen from '../screens/bloodsugar/ResultScreen';
import BloodPressure from '../screens/bloodpressure/BloodPressure';
import AddNewBloodPressureScreen from '../screens/bloodpressure/NewScreen/AddNewBloodPressureScreen';
import AddNewBloodSugarScreen from '../screens/bloodsugar/NewScreen/AddNewBloodSugarScreen';
import SugarBridgeScreen from '../screens/bloodsugar/SugarBridgeScreen';
import BpBridgeScreen from '../screens/bloodpressure/BpBridgeScreen';
import BpResultScreen from '../screens/bloodpressure/BpResultScreen';
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen';
import DisclaimerScreen from '../screens/DisclaimerScreen';
import FeedBackScreen from '../screens/FeedBackScreen';
import AboutUs from '../screens/AboutUs';
import BoardingHeartRate1 from '../screens/HeartRate/BoardingHeartRate1';
import BoardingHeartRate2 from '../screens/HeartRate/BoardingHeartRate2';
import BmiRecordScreen from '../screens/bmi/BmiRecordScreen';
import BmiResultScreen from '../screens/bmi/BmiResultScreen';
import DetailScreen from '../screens/ScreenComonents/Health/DetailScreen';
import TemperatureScreen from '../screens/temperature/TemperatureScreen';
import TemperatureResultScreen from '../screens/temperature/TemperatureResultScreen';
import CalorieDescriptionScreen from '../screens/ScreenComonents/CalorieCounter/CalorieDescriptionScreen';
import Subscription from '../screens/subscription/Subscription';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
StatusBar.setHidden(true);

export default function MainRoute(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={LandingScreen}
        options={{headerShown: false, animationenabled: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AdLoading"
        component={AdLoading}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="GraphAdLoading"
        component={GraphAdLoading}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BloodSugar"
        component={BloodSugar}
        options={{headerShown: false, animationenabled: false}}
      /> 
      <Stack.Screen
        name="SugarBridgeScreen"
        component={SugarBridgeScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BloodPressure"
        component={BloodPressure}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BpBridgeScreen"
        component={BpBridgeScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddNewBloodPressureScreen"
        component={AddNewBloodPressureScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AddNewBloodSugarScreen"
        component={AddNewBloodSugarScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BpResultScreen"
        component={BpResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />

      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="DisclaimerScreen"
        component={DisclaimerScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="FeedBackScreen"
        component={FeedBackScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BoardingHeartRate1"
        component={BoardingHeartRate1}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BoardingHeartRate2"
        component={BoardingHeartRate2}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BmiRecordScreen"
        component={BmiRecordScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="BmiResultScreen"
        component={BmiResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="TemperatureResultScreen"
        component={TemperatureResultScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="CalorieDescriptionScreen"
        component={CalorieDescriptionScreen}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
