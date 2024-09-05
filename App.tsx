import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import BlogScreen from './screens/BlogScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PhotographyServicesScreen from './Services/ServicesDePhotographie';
import PhotoStudioScreen from './Services/StudioDePriseDePhotos';
import PhotoGalleryScreen from './Services/GaleriesDePhotos';
import BookAppointmentScreen from './Services/PrendreUnRendezVous';
import VirtualStudioTourScreen from './Services/VisiteVirtuelleDuStudio';
import RemotePhotographyScreen from './Services/PriseDePhotosADistance';
import GamificationScreen from './screens/GamificationScreen';

import './styles/tailwind.css';

export type RootStackParamList = {
  BottomTab: undefined;
  Login: undefined;
  Register: undefined;
  Blog: undefined;
  PhotographyServices: undefined;
  PhotoStudio: undefined;
  PhotoGallery: undefined;
  BookAppointment: undefined;
  VirtualStudioTour: undefined;
  RemotePhotography: undefined;
  Gamification: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTab">
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Blog"
          component={BlogScreen}
          options={{ title: 'Blog' }}
        />
        <Stack.Screen
          name="PhotographyServices"
          component={PhotographyServicesScreen}
          options={{ title: 'Photography Services' }}
        />
        <Stack.Screen
          name="PhotoStudio"
          component={PhotoStudioScreen}
          options={{ title: 'Photo Studio' }}
        />
        <Stack.Screen
          name="PhotoGallery"
          component={PhotoGalleryScreen}
          options={{ title: 'Photo Gallery' }}
        />
        <Stack.Screen
          name="PickAppointment"
          component={BookAppointmentScreen}
          options={{ title: 'Pick an Appointment' }}
        />
        <Stack.Screen
          name="VirtualStudioTour"
          component={VirtualStudioTourScreen}
          options={{ title: 'Virtual Studio Tour' }}
        />
        <Stack.Screen
          name="RemotePhotography"
          component={RemotePhotographyScreen}
          options={{ title: 'Remote Photography' }}
        />
        <Stack.Screen
          name="Gamification"
          component={GamificationScreen}
          options={{ title: 'Gamification' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
