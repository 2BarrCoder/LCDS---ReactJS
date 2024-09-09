import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, Image, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const VisiteVirtuelle = () => {
  const { width } = Dimensions.get('window');
  const [isWebViewFocused, setIsWebViewFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent} 
        scrollEnabled={!isWebViewFocused} // Disable outer scroll when WebView is focused
      >
        <ImageBackground
          source={require('../assets/def.jpg')}
          style={styles.headerHero}
        >
          <Text style={styles.headerTextHero}>La Casa De Selfie</Text>
          <View style={styles.headerContentHero}>
            <Text style={styles.headerTextHome}>Visite virtuelle</Text>
          </View>
        </ImageBackground>  
        
        <View style={styles.infoCard}>
          <Image
            source={require('../assets/y13.jpg')}
            style={styles.infoImage}
          />
          <Text style={styles.infoText}>
            Welcome to La Casa De Selfie! Schedule your appointment to capture stunning pictures in our professional studio. Whether you're celebrating a special occasion, creating content, or just looking for a fun experience, our studio is equipped with the perfect lighting, backdrops, and equipment to make your photoshoot a memorable one.
          </Text>
        </View>

        {/* Inner ScrollView wrapping the WebView */}
        <View style={{ height: 400, width: '110%' }}>
          <WebView
            source={{ uri: 'https://2barrcoder.github.io/360ImgView/' }} 
            style={{ width: '100%', height: 400 }}
            onScroll={() => setIsWebViewFocused(true)}  // Detect when scrolling starts in the WebView
            onTouchStart={() => setIsWebViewFocused(true)}  // Enable WebView scroll focus
            onTouchEnd={() => setIsWebViewFocused(false)}  // Release WebView scroll focus
            scrollEnabled={true}  // Enable WebView scrolling
          />
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
    padding: 10,
  },
  headerHero: {
    display: 'flex',
    position: 'relative', // Changed from 'static' to 'relative' for compatibility
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
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%', // Adjust width for better responsiveness
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
});

export default VisiteVirtuelle;
