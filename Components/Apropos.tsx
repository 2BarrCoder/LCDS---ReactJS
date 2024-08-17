// components/Apropos.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Apropos: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos de nous</Text>
      <Button
        title="Qui sommes-nous ?"
        onPress={() => navigation.navigate('QuiSommesNous')}
      />
      <Button
        title="Équipe"
        onPress={() => navigation.navigate('Équipe')}
      />
      <Button
        title="Valeurs"
        onPress={() => navigation.navigate('Valeurs')}
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

export default Apropos;
