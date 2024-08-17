import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const defaultImage = require('../assets/y9.jpg'); // Adjust the path as necessary

const PhotoUploadForm = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('No image selected');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [phone, setPhone] = useState('');

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      console.log('Image selected:', selectedImage.uri);
      setImageUri(selectedImage.uri);
      setImageName('image selected' || 'No image selected');
    } else {
      console.log('Image selection was canceled or no assets found');
      setImageUri(null);
      setImageName('No image selected');
    }
  };

  const handleSubmit = () => {
    // Validate form fields
    if (!firstName || !lastName || !email || !address1 || !address2 || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Handle form submission logic here, e.g., sending data to an API
    Alert.alert('Form Submitted', 'Your data has been successfully submitted!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={imageUri ? { uri: imageUri } : defaultImage}
              style={styles.image}
            />
          </View>
          <View style={styles.imageInfo}>
            <Text style={styles.imageName}>{imageName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          <Text style={styles.btnText}>Choisir une photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address 01"
          value={address1}
          onChangeText={setAddress1}
        />
        <TextInput
          style={styles.input}
          placeholder="Address 02"
          value={address2}
          onChangeText={setAddress2}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Button title="Submit" onPress={handleSubmit} color="#03DAC6" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'aliceblue', // Background color for the entire screen
  },
  formContainer: {
    backgroundColor: 'white', // Background color for the form container
    borderRadius: 10,
    padding: 16,
    width: '100%',
    maxWidth: 400, // Optional: limits the width of the form container
    alignItems: 'center',
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden', // Ensure image does not overflow
    marginRight: 20, // Space between image and text
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageInfo: {
    flex: 1,
  },
  imageName: {
    fontSize: 16,
    color: '#333',
  },
  btn: {
    backgroundColor: '#03DAC6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    color: 'aliceblue',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: '100%',
  },
});

export default PhotoUploadForm;
