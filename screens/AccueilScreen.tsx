import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Accueil: undefined;
  'À propos': undefined;
  Services: undefined;
  Blog: undefined;
  Contact: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

type AccueilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Accueil'>;

type Props = {
  navigation: AccueilScreenNavigationProp;
};

const AccueilScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/y10.jpg')} // Chemin vers votre image d'arrière-plan
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image 
            source={require('../assets/y9.jpg')} // Chemin vers votre image
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('À propos')}
          >
            <Text style={styles.buttonText}>À propos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Services')}
          >
            <Text style={styles.buttonText}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Blog')}
          >
            <Text style={styles.buttonText}>Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 350,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#03DAC6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AccueilScreen;
