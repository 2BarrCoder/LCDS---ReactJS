import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { joinGamification } from '../screens/session_utils'; // Import the joinGamification function

const Card2 = ({ userId }) => { // Pass userId as a prop
  const navigation = useNavigation();

  const handleCreateProfile = async () => {
    try {
      const result = await joinGamification();
      if (result.success) {
        Alert.alert('Success', 'Gamification profile created successfully.');
       
        navigation.navigate('Gamification', { reload: true });

      } else {
        Alert.alert('Error', result.message || 'Failed to create gamification profile.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>You don’t have a Gamification Profile. Please Create One to access this content.</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProfile} // Handle button press
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    marginTop: '80%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageCard: {
    padding: 20,
    backgroundColor: '#FFCDD2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  messageText: {
    fontSize: 18,
    color: '#B71C1C',
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#00796B',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Card2;
