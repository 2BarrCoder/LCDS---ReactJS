import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assure-toi que ce paquet est installé
import AccueilScreen from './screens/AccueilScreen';
import AproposScreen from './screens/AproposScreen';
import ServicesScreen from './screens/ServicesScreen';
import ContactScreen from './screens/ContactScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import GamificationScreen from './screens/GamificationScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Accueil':
              iconName = 'home';
              break;
            case 'À propos':
              iconName = 'information-circle';
              break;
            case 'Services':
              iconName = 'briefcase';
              break;
            case 'Gamification':
              iconName = 'trophy'; // Icône pour la gamification
              break;
            case 'Contact':
              iconName = 'mail';
              break;
            case 'LoginScreen':
              iconName = 'log-in';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'alert';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#03DAC6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="À propos" component={AproposScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Gamification" component={GamificationScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      
      <Tab.Screen name="Settings" component={SettingsScreen} />
      
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
