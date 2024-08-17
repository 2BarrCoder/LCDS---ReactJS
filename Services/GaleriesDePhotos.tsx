import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GaleriesDePhotos: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeries de Photos</Text>
      {/* Ajoutez ici des détails sur les galeries de photos */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GaleriesDePhotos;
