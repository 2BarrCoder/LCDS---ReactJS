// components/Accueil.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Accueil: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Casa de Selfie</Text>
      <Button
        title="Voir les Services"
        onPress={() => navigation.navigate('Services')}
      />
      <Button
        title="À propos"
        onPress={() => navigation.navigate('À propos')}
      />
      <Button
        title="Blog"
        onPress={() => navigation.navigate('Blog')}
      />
      <Button
        title="Contact"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Accueil;

