import React from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Linking, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const ContactScreen: React.FC = () => {
  const insets = useSafeAreaInsets(); // Get the safe area insets

  const handlePhonePress = () => {
    Linking.openURL('tel:+21212345678');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:scte_contact@email.com');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Safe Area View */}
      <View style={styles.fixedArea}></View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../assets/def.jpg')}
          style={styles.headerHero}
        >
          <Text style={styles.headerTextHero}>La Casa De Selfie</Text>
          <View style={styles.headerContentHero}>
            <Text style={styles.headerTextHome}>Contact Us</Text>
          </View>
        </ImageBackground>  
        <View style={styles.header}>
          <Image 
            source={require('../assets/y9.jpg')}
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.heading}>Heading</Text>
          <Text style={styles.subheading}>Subheading</Text>
          <Text style={styles.bodyText}>
            Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look.
          </Text>
          <View style={styles.contactDetail}>
            <Icon name="phone" size={20} color="#00796B" style={styles.icon} />
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={styles.contactText}>+21212345678</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactDetail}>
            <Icon name="envelope" size={20} color="#00796B" style={styles.icon} />
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.contactText}>scte_contact@email.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactDetail}>
            <Icon name="home" size={20} color="#00796B" style={styles.icon} />
            <Text style={styles.contactText}>adresse 1, rue 1, avenue 1, ville 1</Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Contact 01</Text>
          <Text style={styles.formSubtitle}>Contact Us</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Surname" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Message" multiline />
          <TouchableOpacity style={styles.button} onPress={() => alert('Form submitted!')}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Map View Section */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 33.5945671,
              longitude: -7.6006619,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude: 33.5945671, longitude: -7.6006619 }} title="IbtikarCom" />
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixedArea: {
    paddingTop: 30,
    width: '100%',
  },
  headerHero: {
    display: 'flex',
    position: 'static',
    left: '-7%',
    width: '110%',
    height: 180, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay to make text more readable
  },
  headerContentHero: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextHero: {
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
  },
  fixedSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 0,
    alignItems: 'center',
    zIndex: 1, // Ensures it stays above other content
    // Adjust height if needed to fit the content
  },
  logo: {
    width: 150,
    height: 100,
  },
  scrollContent: {
    paddingTop: 0, // Adjust this value based on the height of your fixedSafeArea
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subheading: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  bodyText: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  form: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  formSubtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  mapContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
});

export default ContactScreen;
