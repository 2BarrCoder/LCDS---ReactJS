import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {sub} from '../screens/session_utils';
const AboutUs = () => {
  const navigation = useNavigation(); 
  const [email,setEmail] = useState('');

 const submit = () => {
  console.log(email);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    Alert.alert('Error', 'Please enter an email before submitting');
    return;
  }

  if (!emailRegex.test(email)) {
    Alert.alert('Error', 'Please enter a valid email address');
    return;
  }

  const initialize =async () => {  
    const data = await sub(email);
    if(data.success)
    {
      Alert.alert('Success', 'You have been subscribed Successfully ');
      setEmail('');
    }
    else {
      Alert.alert('Failed', 'This email is already been Subscribed ');
    }

  }

  initialize();
};





  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.subheading}>Subheading</Text>
        <Text style={styles.bodyText}>
          Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
        </Text>
        <Text style={styles.loremIpsum}>
          Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi 
          intricate Content. Qui international first-class nulla ut. Punctual adipiscing, essential lovely quem tempor eiusmod irure. 
          Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui 
          wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('À propos')} // Corrected the onPress function
        >
          <Text style={styles.buttonText}>See More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {/* Placeholder for the image */}
        <Image
          //source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL or local image path
          source = {require('../assets/yyy.png')}
          
          style={styles.image}
        />
      </View>

      <View style={styles.subscribeContainer}>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity 
        style={styles.subscribeButton}
        onPress={submit}
        >
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  textContainer: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  loremIpsum: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // To make it circular
  },
  subscribeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  subscribeButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AboutUs;
