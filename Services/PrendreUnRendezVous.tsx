import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone || !email || !date) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Appointment Scheduled', `Your appointment has been scheduled for ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(prevDate => new Date(selectedDate.setHours(prevDate.getHours(), prevDate.getMinutes())));
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setDate(prevDate => new Date(prevDate.setHours(selectedDate.getHours(), selectedDate.getMinutes())));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimePicker}>
            <Text>Date:</Text>
            <Button title={date.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={date}
                onChange={handleDateChange}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              />
            )}
          </View>
          <View style={styles.dateTimePicker}>
            <Text>Time:</Text>
            <Button title={date.toLocaleTimeString()} onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={date}
                onChange={handleTimeChange}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              />
            )}
          </View>
        </View>
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
    backgroundColor: 'aliceblue',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  dateTimePicker: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
});

export default AppointmentForm;
