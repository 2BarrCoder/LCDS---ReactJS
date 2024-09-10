import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../assets/def.jpg')}
          style={styles.header}
        >
          <Text style={styles.headerText}>La Casa De Selfie</Text>
          <View style={styles.headerContent}>
            <Text style={styles.headerTextHome}>Services</Text>
          </View>
        </ImageBackground> 

        {/* Row 1 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PhotoStudio')}
          >
            <Image 
              source={require('../assets/y6.jpg')}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Studio de Prise de Photos</Text>
            <Text style={styles.cardDescription}>
              Réservez une session dans notre studio de photographie entièrement équipé.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PhotoGallery')}
          >
            <Image 
              source={require('../assets/y6.jpg')}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Galeries de Photos</Text>
            <Text style={styles.cardDescription}>
              Parcourez nos galeries de photos pour voir notre travail et trouver l'inspiration.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
            
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('VirtualStudioTour')}
          >
            <Image 
              source={require('../assets/y7.jpeg')}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Visite Virtuelle du Studio</Text>
            <Text style={styles.cardDescription}>
              Faites une visite virtuelle de notre studio pour voir nos installations avant votre visite.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PickAppointment')}
          >
            <Image 
              source={require('../assets/y6.jpg')}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Prendre un Rendez-vous</Text>
            <Text style={styles.cardDescription}>
              Réservez une séance photo à votre convenance grâce à notre système de réservation en ligne.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          

          {/* Add another service here if needed */}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'static',
    top: -15,
    left: '-7%',
    width: '110%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  headerTextHome: {
    color: '#03DAC6',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '48%', // Adjust width to ensure two cards fit in one row
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ServicesScreen;
