import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const defaultImage = require('../assets/y9.jpg'); // Adjust the path as necessary

const backgrounds = [
  require('../assets/y7.jpeg'),
  require('../assets/y13.jpg'),
  require('../assets/nat1.jpg'),
  require('../assets/nat2.webp'),
];

const PhotoUploadForm = () => {
  const [imageUri, setImageUri] = useState(null);
  const [removedBgImageUri, setRemovedBgImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]);
  const [capturedUri, setCapturedUri] = useState(null);
  const viewShotRef = useRef(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageUri(selectedImage.uri);
      autoRemoveBackground(selectedImage.uri);
    } else {
      setImageUri(null);
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const capturedImage = result.assets[0];
      setImageUri(capturedImage.uri);
      autoRemoveBackground(capturedImage.uri);
    } else {
      setImageUri(null);
    }
  };

  const autoRemoveBackground = async (uri) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image_file', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const bgRemoveResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'owd2VRvj3wXAz6BZwL1f92Vu', // Replace with your remove.bg API key
        },
        body: formData,
      });

      if (!bgRemoveResponse.ok) {
        throw new Error('Failed to remove the background.');
      }

      const blobResponse = await bgRemoveResponse.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setRemovedBgImageUri(reader.result);
        setSelectedBackground(backgrounds[0]); // Automatically select the first background
      };
      reader.readAsDataURL(blobResponse);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove the background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectBackground = (background) => {
    setSelectedBackground(background);
  };

  const captureAndDownloadImage = async () => {
    try {
    if (viewShotRef.current) {
      const uri = await captureRef(viewShotRef.current, {
        format: 'png',
        quality: 0.8,
      });
      setCapturedUri(uri);

      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is required to save the image.');
        return;
      }

      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('LCDS', asset, false);

      Alert.alert('Success', 'Image saved to gallery.');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to capture and save the image.');
  }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ViewShot ref={viewShotRef} style={styles.imageSection}>
            <View style={styles.imageContainer}>
              {selectedBackground && (
                <Image source={selectedBackground} style={styles.backgroundImage} />
              )}
              <Image
                source={removedBgImageUri ? { uri: removedBgImageUri } : defaultImage}
                style={styles.image}
              />
            </View>
          </ViewShot>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.btnText}>Choose Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={takePicture}>
              <Text style={styles.btnText}>Take Picture</Text>
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator size="large" color="#03DAC6" />}

          {removedBgImageUri && (
            <>
              <View style={styles.backgroundIconContainer}>
                <FlatList
                  data={backgrounds}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectBackground(item)}>
                      <Image source={item} style={styles.backgroundIcon} />
                    </TouchableOpacity>
                  )}
                  horizontal
                />
              </View>

              <TouchableOpacity style={styles.btn} onPress={captureAndDownloadImage}>
                <Text style={styles.btnText}>Capture and Download Image</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'aliceblue',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderColor: '#ddd',
    //borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backgroundIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center horizontally
    marginTop: 20,
  },
  backgroundIcon: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default PhotoUploadForm;
