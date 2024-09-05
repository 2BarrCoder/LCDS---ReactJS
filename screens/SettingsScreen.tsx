import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from '../assets/y9.jpg'; // Import the default image
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { checkSession, logOut, Friends, getGamificationProfile } from './session_utils'; // Import the utility function
import Card2 from '../Components/cardError';
import { updateUser, deleteAcc } from './session_utils';

const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(defaultImage); // Initialize with default image
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [initialUser, setInitialUser] = useState({}); // State to store initial user data
  const [sessionValid, setSessionValid] = useState(true);
  const [idUser, setUserId] = useState('');
  const [friends, setFriends] = useState([
    
  ]);

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        try {
          const data = await checkSession(); // Use the utility function
          if (data.success) {
            setSessionValid(true);
            setUserId(data.user.id);
            const { user } = data;
            setInitialUser(user); // Store the initial user data
            setProfilePic(user.profilePic || defaultImage); // Set profile picture
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setSecondAddress(user.email || '');
          } else {
            setSessionValid(false);
          }
        } catch (error) {
          Alert.alert('Error', 'Connection error with the server.');
          setSessionValid(false);
        } finally {
          setLoading(false);
        }
      };

      initialize();
      getFriends();
    }, [navigation])
  );

  const handleImagePick = async () => {
    if (!isEditing) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePic({ uri: result.assets[0].uri });
    } else {
      Alert.alert('Image Selection', 'No image selected.');
    }
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const userData = {
      name,
      phone,
      address,
      profilePic: profilePic.uri || profilePic,
    };

    const data = await updateUser(userData);

    if (data.success) {
      Alert.alert('Success', 'Profile updated successfully.');
      setInitialUser(userData); 
      setIsEditing(false);
    } else {
      Alert.alert('Error', data.message || 'Failed to update profile.');
    }
  };

  const handleReset = () => {
    // Reset fields to original values from initialUser state
    setProfilePic(initialUser.profilePic || defaultImage);
    setName(initialUser.name || '');
    setPhone(initialUser.phone || '');
    setAddress(initialUser.address || '');
    setSecondAddress(initialUser.email || '');
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteAccount() },
      ]
    );
  };

  const deleteAccount = async () => {
    const deleteData = await deleteAcc();
    if (deleteData.success) {
      Alert.alert('Success', 'Your Account has been deleted!');
      handleLogout();
    } else {
      Alert.alert('Failed', 'Your Account has not been deleted!');
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logOut(); 
      if (data.success) {
        Alert.alert('Logout', 'You have been logged out.');
        navigation.navigate('LoginScreen'); 
      } else {
        Alert.alert('Logout', 'Error: Unable to log out.');
      }
    } catch (error) {
      Alert.alert('Error', 'Connection error with the server.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('LoginScreen');
  };

  const getFriends = async() => {
    try{

      const gamProfile = await getGamificationProfile();
    const FriendsData = await Friends(gamProfile.data.Code);
    console.log(gamProfile.data.Code , gamProfile.data.id);
   if (FriendsData.success)
    {

      let friendsArray = Object.values(FriendsData.data);
      console.log(Array.isArray(friendsArray));
      friendsArray = friendsArray.pop(1);
      console.log(friendsArray);
      let i =0;
      // Prepare to collect new friends
      for (let i = 0; i < friendsArray.length; i++) {
        let obj = Object.values(friendsArray[i]);
        let newId = String(obj[0]).trim(); // First column ID
        let newName = String(obj[1]).trim(); // Second column Name
        let newFriend = { id: newId, name: newName, image: defaultImage, winPercentage: '40%' };

        // Check if the ID is already in the friends list
        let isDuplicate = false;

         if (friends[0]?.id === 0) {
            friends.splice(0, 1);
          }

        for (let j = 0; j < friends.length; j++) {
          
          if (friends[j].id === newId) {
            isDuplicate = true;
            break;
          }
        }

        if (!isDuplicate) {
          friends.push(newFriend);
        }
      }

      // Update the state with the updated friends list
      setFriends([...friends]);

    }
    else{
       setFriends([{id: 0, name: 'No friends for the moment',  winPercentage: '\nYou must share your code to have friends !\n\n You can create a gamificaton profile if you don\'t have one !'}]);
  
    }

    }catch(Error)
    {
      setFriends([{id: 0, name: 'No friends for the moment',  winPercentage: '\nYou must share your code to have friends !\n\n You can create a gamificaton profile if you don\'t have one !'}]);
    }
    
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00796B" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding:15}}>

      </View>
      {sessionValid ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}></View>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleImagePick} style={styles.imageButton}>
              <Image
                source={profilePic}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              {!isEditing && (
                <>
                  <Text style={styles.profileName}>{name}</Text>
                  <Text style={styles.detailsText2}>{secondAddress}</Text>
                  <Text style={styles.detailsText}>Phone: {phone}</Text>
                  <Text style={styles.detailsText}>Address: {address}</Text>
                </>
              )}
              <TouchableOpacity style={styles.button} onPress={isEditing ? handleSave : handleEditProfile}>
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
              </TouchableOpacity>
              {isEditing && (
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isEditing && (
            <View style={styles.editSection}>
              <Text style={styles.editTitle}>Edit Profile</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
              />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
              />
            </View>
          )}

          <View style={styles.friendsList}>
            <Text style={styles.friendsTitle}>Friends</Text>
            {friends.map(friend => (
              <View key={friend.id} style={styles.friendCard}>
                <Image source={friend.image} style={styles.friendImage} />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendWinPercentage}>{friend.winPercentage}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.actionButtonText}>Delete My Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Card2 onLoginRedirect={handleLoginRedirect} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imageButton: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 15,
    color: '#757575',
    marginBottom: 5,
  },
   detailsText2: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    fontSize: 16,
    padding: 8,
  },
  friendsList: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  friendsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendWinPercentage: {
    fontSize: 14,
    color: '#757575',
  },
  actionButtons: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
