import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServicesDePhotographie: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services de Photographie</Text>
      {/* Ajoutez ici des détails sur les services de photographie */}
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

export default ServicesDePhotographie;
