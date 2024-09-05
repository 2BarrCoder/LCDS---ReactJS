import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ImageBackground, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import {scheduleAppointment} from '../screens/session_utils';

const StudioDePriseDePhoto = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
  if (!name || !phone || !email || !date) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  const appointmentDetails = {
    name,
    phone,
    email,
    date: date.toISOString().split('T')[0],
    time: date.toTimeString().split(' ')[0],
  };

  setLoading(true);  // Start loading
  try {
    const responseText = await scheduleAppointment(appointmentDetails);
    Alert.alert('Appointment Status', responseText);
  } catch (error) {
    Alert.alert('Error', error.message);
  } finally {
    setLoading(false);  // Stop loading
  }
};


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(prevDate => new Date(selectedDate.setHours(prevDate.getHours(), prevDate.getMinutes())));
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setDate(prevDate => new Date(prevDate.setHours(selectedDate.getHours(), selectedDate.getMinutes())));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground
        source={require('../assets/def.jpg')}
        style={styles.headerHero}
      >
        <Text style={styles.headerTextHero}>La Casa De Selfie</Text>
        <View style={styles.headerContentHero}>
          <Text style={styles.headerTextHome}>Studio de prise de photo</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.infoCard}>
          <Image
            source={require('../assets/y13.jpg')}
            style={styles.infoImage}
          />
          <Text style={styles.infoText}>
            Welcome to La Casa De Selfie! Schedule your appointment to capture stunning pictures in our professional studio. Whether you're celebrating a special occasion, creating content, or just looking for a fun experience, our studio is equipped with the perfect lighting, backdrops, and equipment to make your photoshoot a memorable one.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Image
            source={require('../assets/y13.jpg')}
            style={styles.infoImage}
          />
          <Text style={styles.infoText}>
            Welcome to La Casa De Selfie! Schedule your appointment to capture stunning pictures in our professional studio. Whether you're celebrating a special occasion, creating content, or just looking for a fun experience, our studio is equipped with the perfect lighting, backdrops, and equipment to make your photoshoot a memorable one.
          </Text>
        </View>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    //backgroundColor: '#FFFF',  // Dark background similar to the image
  },
  headerHero: {
    width: '100%',
    height: 200,  // Adjusted for better fit
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContentHero: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextHero: {
    color: '#E1E1E1',  // Light gray text
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTextHome: {
    color: '#03DAC6',  // A bright, contrasting color for the subtitle
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    //backgroundColor: '#FFF8FF',
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  infoImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',  // Dark card background
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    //backgroundColor: '#F6F6F6',  // Slightly lighter than the card
    color: 'black',
    fontSize: 16,
  },
  dateTimeContainer: {
    marginVertical: 20,
  },
  dateInput: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    //backgroundColor: '#F6F6F6',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#121212',
  },
  submitButton: {
    backgroundColor: '#121212',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudioDePriseDePhoto;
