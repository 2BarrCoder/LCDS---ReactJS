import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Accueil: undefined;
  'À propos': undefined;
  Services: undefined;
  Blog: undefined;
  Contact: undefined;
  ServicesDePhotographie: undefined;
  StudioDePriseDePhotos: undefined;
  GaleriesDePhotos: undefined;
  PrendreUnRendezVous: undefined;
  VisiteVirtuelleDuStudio: undefined;
  VisiteVirtuelleInteractive: undefined;
  PriseDePhotosADistance: undefined;
  PaiementEnLigne: undefined;
};

type ServicesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Services'>;

type Props = {
  navigation: ServicesScreenNavigationProp;
};

const ServicesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Nos Services</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ServicesDePhotographie')}
        >
          <Image 
            source={require('../assets/y6.jpg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Services de Photographie</Text>
          <Text style={styles.cardDescription}>
            Découvrez nos services de photographie professionnels pour capturer vos moments précieux.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('StudioDePriseDePhotos')}
        >
          <Image 
            source={require('../assets/y6.jpg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Studio de Prise de Photos</Text>
          <Text style={styles.cardDescription}>
            Réservez une session dans notre studio de photographie entièrement équipé.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('GaleriesDePhotos')}
        >
          <Image 
            source={require('../assets/y6.jpg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Galeries de Photos</Text>
          <Text style={styles.cardDescription}>
            Parcourez nos galeries de photos pour voir notre travail et trouver l'inspiration.
          </Text>
        </TouchableOpacity>


          <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PriseDePhotosADistance')}
        >
          <Image 
            source={require('../assets/y7.jpeg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Prise de Photos à Distance</Text>
          <Text style={styles.cardDescription}>
            Prenez des photos à distance comme si vous étiez présent grâce à notre technologie avancée.
          </Text>
        </TouchableOpacity>






        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PrendreUnRendezVous')}
        >
          <Image 
            source={require('../assets/y6.jpg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Prendre un Rendez-vous</Text>
          <Text style={styles.cardDescription}>
            Réservez une séance photo à votre convenance grâce à notre système de réservation en ligne.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VisiteVirtuelleDuStudio')}
        >
          <Image 
            source={require('../assets/y7.jpeg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Visite Virtuelle du Studio</Text>
          <Text style={styles.cardDescription}>
            Faites une visite virtuelle de notre studio pour voir nos installations avant votre visite.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VisiteVirtuelleInteractive')}
        >
          <Image 
            source={require('../assets/y6.jpg')} // Ensure you have an appropriate image
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Visite Virtuelle Interactive</Text>
          <Text style={styles.cardDescription}>
            Explorez notre studio avec une visite virtuelle interactive pour une expérience immersive.
          </Text>
        </TouchableOpacity>

        
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

export default ServicesScreen;
