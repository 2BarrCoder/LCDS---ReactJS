import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assure-toi que ce paquet est installé
import AccueilScreen from './screens/AccueilScreen';
import AproposScreen from './screens/AproposScreen';
import ServicesScreen from './screens/ServicesScreen';
import BlogScreen from './screens/BlogScreen';
import ContactScreen from './screens/ContactScreen';
import LoginScreen from './screens/LoginScreen';

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
            case 'Blog':
              iconName = 'book';
              break;
            case 'Contact':
              iconName = 'mail';
              break;
            case 'LoginScreen':
              iconName = 'log-in'; // Exemple d'icône pour la connexion
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
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
