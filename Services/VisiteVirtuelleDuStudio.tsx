import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const VisiteVirtuelle = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <WebView
       source={{ uri: 'https://2barrcoder.github.io/360ImgView/' }} 
        style={{ width, height }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default VisiteVirtuelle;
