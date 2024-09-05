import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator,ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const GaleriesDePhotos: React.FC = () => {
  const [galeries, setGaleries] = useState([


]);
  
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetch('http://192.168.0.102/CasaDeselfi/CasaDeselfi/backend/getGalerie.php')
        .then((response) => response.json())
        .then((data) => {
          if (isActive) {
            setGaleries(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isActive) {
            console.error('Error fetching galleries:', error);
            setLoading(false);
          }
        });

      // Cleanup function to avoid setting state on unmounted component
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (galeries.length === 0) {
    return (
      <View style={styles.emptyContainer}>

        <ImageBackground
        source={require('../assets/def.jpg')}
        style={styles.headerHero}
      >
        <Text style={styles.headerTextHero}>La Casa De Selfie</Text>
        <View style={styles.headerContentHero}>
          <Text style={styles.headerTextHome}>Galleries</Text>
        </View>
      </ImageBackground>

        <Text style={styles.emptyText}>No galleries available at the moment.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <ImageBackground
        source={require('../assets/def.jpg')}
        style={styles.headerHero}
      >
        <Text style={styles.headerTextHero}>La Casa De Selfie</Text>
        <View style={styles.headerContentHero}>
          <Text style={styles.headerTextHome}>Galleries</Text>
        </View>
      </ImageBackground>






      <View style={styles.gridContainer}>
        {galeries.map((galerie) => (
          <TouchableOpacity key={galerie.id} style={styles.imageContainer}>
            <Image source={{ uri: galerie.img }} style={styles.image} />
            
            <View style={styles.overlay}>
              <Text style={styles.galerieTitle}>{galerie.titre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

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
    backgroundColor: '#f4f4f4',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  },
  imageContainer: {
    width: '48%',
    height: 200,
    marginBottom: 4,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  galerieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});

export default GaleriesDePhotos;
