import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AboutUs from '../Components/about-us';

type RootStackParamList = {
  

};

type AccueilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Accueil'>;

type Props = {
  navigation: AccueilScreenNavigationProp;
};

const AccueilScreen: React.FC<Props> = ({ navigation }) => {
  return (
   
      <View style={styles.container}>
        <View style = {styles.fixedHeader}>

        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <ImageBackground
            source={require('../assets/def.jpg')}
            style={styles.header}
          >
           <Text style={styles.headerText}>La Casa De Selfie</Text>
            <View style={styles.headerContent}>
              <Text style={styles.headerTextHome}>Home</Text>
             
            </View>
          </ImageBackground>
          <View style={styles.header2}>
                 <Text style={styles.headerText2}>Values</Text>
          </View>

          <TouchableOpacity
          style={styles.card}
          
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
          <AboutUs>

          </AboutUs>

        </ScrollView>
      </View>
    
  );
};

const styles = StyleSheet.create({
  fixedHeader : {
    paddingTop: 25,
    width: '100%',
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

   header: {
    display: 'flex',
    position: 'static',
    top: -15,
    left: '-7%',
    width: '110%',
    height: 180, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay to make text more readable
  },
  header2: {
    display: 'flex',
    position: 'static',
    top: 5,
    left: '-7%',
    width: '110%',
    height: 70, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom : 15,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay to make text more readable
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
 headerText2: {
  
    fontSize: 24,
    fontWeight: 'bold',
    left : -100,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
});

export default AccueilScreen;
