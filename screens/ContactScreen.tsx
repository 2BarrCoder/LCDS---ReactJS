import React from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      <View style={[styles.fixedSafeArea, { paddingTop: insets.top }]}>
       
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Text style={styles.contactDetail} onPress={handlePhonePress}>
            Phone: +21212345678
          </Text>
          <Text style={styles.contactDetail} onPress={handleEmailPress}>
            Email: scte_contact@email.com
          </Text>
          <Text style={styles.contactDetail}>Address: adresse 1, rue 1, avenue 1, ville 1</Text>
        </View>

        {/* Contact Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Contact 01</Text>
          <Text style={styles.formSubtitle}>Contact Us</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Surname" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Message" multiline />
          <Button title="Submit" onPress={() => alert('Form submitted!')} />
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
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
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
