import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ServicesDePhotographie from './Services/ServicesDePhotographie';
import StudioDePriseDePhotos from './Services/StudioDePriseDePhotos';
import GaleriesDePhotos from './Services/GaleriesDePhotos';
import PrendreUnRendezVous from './Services/PrendreUnRendezVous';
import VisiteVirtuelleDuStudio from './Services/VisiteVirtuelleDuStudio';
import PriseDePhotosADistance from './Services/PriseDePhotosADistance';

export type RootStackParamList = {
  Accueil:undefined;
  BottomTab: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ServicesDePhotographie: undefined;
  StudioDePriseDePhotos: undefined;
  GaleriesDePhotos: undefined;
  PrendreUnRendezVous: undefined;
  VisiteVirtuelleDuStudio: undefined;
  PriseDePhotosADistance: undefined;
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
        
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ServicesDePhotographie" component={ServicesDePhotographie} />
        <Stack.Screen name="StudioDePriseDePhotos" component={StudioDePriseDePhotos} />
        <Stack.Screen name="GaleriesDePhotos" component={GaleriesDePhotos} />
        <Stack.Screen name="PrendreUnRendezVous" component={PrendreUnRendezVous} />
        <Stack.Screen name="VisiteVirtuelleDuStudio" component={VisiteVirtuelleDuStudio} />
        <Stack.Screen name="PriseDePhotosADistance" component={PriseDePhotosADistance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
