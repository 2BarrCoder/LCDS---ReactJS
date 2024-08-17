import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AproposScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle}>À propos de nous</Text>
        </View>
        <View style={styles.teamContainer}>
          <Image 
            source={require('../assets/yyyyy.png')} // Assurez-vous de mettre une image appropriée
            style={styles.teamImage}
          />
          <Text style={styles.text}>
             Nous sommes une entreprise spécialisée dans la photographie qui offre à ses clients
        deux principaux services. Le premier permet aux visiteurs et aux clients de consulter
        des galeries de photos puis de rendre rendez-vous pour une séance photo au studio. Le
        second service offre aux visiteurs la possibilité d'effectuer une visite virtuelle du
        studio et, pour les clients inscrits, de prendre des photos à distance comme s'ils
        étaient physiquement présents au studio.
          </Text>
        </View>
      </View>
<View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle}>Notre Équipe</Text>
        </View>
        <View style={styles.teamContainer}>
          <Image 
            source={require('../assets/yy.png')} // Assurez-vous de mettre une image appropriée
            style={styles.teamImage}
          />
          <Text style={styles.text}>
            Découvrez les talents derrière notre entreprise. Notre équipe est composée de
            photographes professionnels et de créatifs passionnés par l'art de capturer des moments.
          </Text>
        </View>
      </View>



      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subtitle}>Nos Valeurs</Text>
        </View>
        <View style={styles.valuesContainer}>
          <View style={styles.valueItem}>
            <Image 
              source={require('../assets/yy.png')} // Assurez-vous de mettre une icône appropriée
              style={styles.icon}
            />
            <Text style={styles.text}>
              Qualité : Nous nous engageons à fournir des services exceptionnels avec un
              souci constant du détail.
            </Text>
          </View>
          <View style={styles.valueItem}>
            <Image 
              source={require('../assets/yyy.png')} // Assurez-vous de mettre une icône appropriée
              style={styles.icon}
            />
            <Text style={styles.text}>
              Innovation : Nous intégrons les dernières technologies pour offrir des
              expériences uniques à nos clients.
            </Text>
          </View>
          <View style={styles.valueItem}>
            <Image 
              source={require('../assets/yyyy.png')} // Assurez-vous de mettre une icône appropriée
              style={styles.icon}
            />
            <Text style={styles.text}>
              Satisfaction Client : Votre satisfaction est notre priorité. Nous travaillons
              sans relâche pour dépasser vos attentes.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#FFF', // Arrière-plan blanc pour les sections
    borderRadius: 10, // Coins arrondis
    shadowColor: '#000', // Ombre pour effet de profondeur
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Ombre sur Android
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#800080', // Couleur de la bordure
    paddingBottom: 10,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
  teamContainer: {
    alignItems: 'center',
  },
  teamImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Arrondir l'image
    marginBottom: 15,
  },
  valuesContainer: {
    marginTop: 10,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    flexShrink: 1,
  },
});

export default AproposScreen;
