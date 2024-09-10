import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator, Alert, ImageBackground  } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { checkSession, logOut, getGamificationProfile, getTasks, updateCode,updateFriendCode, updateLevel } from './session_utils'; // Import the utility function
import Card2 from '../Components/cardError';
import CardG from '../Components/CardGam';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const GamificationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute(); // Access the route object
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [profileExists, setProfileExists] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [points, setPoints] = useState({ current: 0, remaining: 0 });
  const [tasks, setTasks] = useState([]);
   const [val, setVal] = useState('');
  const [FriendCode,setFriendCode] = useState('');
useFocusEffect(
  useCallback(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        const sessionData = await checkSession();
        if (!sessionData.success) {
          setHasAccount(false);
          setLoading(false);
          return;
        }
        
        const profileData = await getGamificationProfile();
        if (profileData.success && profileData.data) {
          setVal(profileData.data.Code || '');
          setProfileExists(true);
          setProfileData(profileData.data);
          const remain = calculateRemainingTasks(profileData.data.level,profileData.data.tasks_done,initialize);
          setPoints(prev => ({ ...prev, remaining: remain }));
          
          const tasksData = await getTasks();
          if (tasksData.success) {
            setTasks(tasksData.tasks);
          }
        } else {
          // Handle the case where the profile does not exist
          setProfileExists(false);
          //Alert.alert('Profile Missing', 'You do not have a gamification profile yet.');
        }

        setName(sessionData.user.name || 'User');
        setHasAccount(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to load session data.');
        setHasAccount(false);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [route.params?.reload, navigation])
);


  const handleLogout = async () => {
    try {
      const data = await logOut();
      if (data.success) {
        Alert.alert('Logged out', 'You have been logged out.');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', 'Failed to log out.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  const calculateRemainingTasks = (currentLevel,tasks_done,initialize) => {
    let remaining = 0;
    if(!tasks_done)
    {
      tasks_done = 0;
    }
    if (currentLevel == 1) {
      remaining = 2 - tasks_done;
     
    } 
    else if (currentLevel <= 6) {
      remaining = (currentLevel*2 + 1) - tasks_done;
      
    } else {
      remaining = ((currentLevel - 6) * 4) + 4 - tasks_done;
   
  }
    if (remaining ==0)
    {
     
      levelData(currentLevel,initialize);
      
    }

   
   return remaining; 
  };


  const levelData = async(Level,initialize)=>{
          const data = await updateLevel(Level);
          if (data.success)
          {
            navigation.navigate('Gamification');
            initialize(); 
          }
        };


  const handleLoginRedirect = () => {
    navigation.navigate('LoginScreen');
  };

const partager = async () => {
   
    await Clipboard.setStringAsync(val);
    Alert.alert('Copied to clipboard', `Copied: ${val}`);
  };

  const generer = async () => {
    console.log(val);
    if ( val =='' )
    {
      let res = '';
    for (let i = 0 ; i < 7 ;i++)
    {
    let char = Math.floor(Math.random()*26 + 97);
    let char2 = String.fromCharCode(char).toUpperCase();
    res += char2;
  
    }
     const updateData = await updateCode (res);
     if (updateData.success)
      {
        setVal(res);

      } 
      
    else
    {
      Alert.alert('Failed', updateData.message);
    }
    }

    else
    {
      Alert.alert('Failed', 'Already Have A code');
    }
    
  }

  const parriner = async() =>{
    
    const updateData = await updateFriendCode (FriendCode);
     if (updateData.success)
      {
        Alert.alert('Success','The code is updated successfully');
        
       // initialize();

      } 
      else {
        Alert.alert('Failed',updateData.message);

      } 

  }

  if (loading) {
    return <ActivityIndicator size="large" color="#00796B" />;
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {!hasAccount ? (
        <Card2 onLoginRedirect={handleLoginRedirect} />
      ) : !profileExists ? (
        <CardG />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ImageBackground
            source={require('../assets/banner.jpg')}
            style={styles.header}
          >
           <Text style={styles.headerText}>Welcome Back, {name}</Text>
            <View style={styles.headerContent}>
              <Text style={styles.headerText}>LEVEL {profileData?.level || 'N/A'}</Text>
              <Text style={styles.silverText}>Silver</Text>
            </View>
          </ImageBackground>

          <View style={styles.pointsBox}>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsNumber}>{profileData?.tasks_done}</Text>
              <Text style={styles.subText}>Tasks Done</Text>
            </View>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsNumber}>{profileData?.point}</Text>
              <Text style={styles.subText}>Actual points</Text>
            </View>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsNumber}>{points.remaining}</Text>
              <Text style={styles.subText}>Tasks to next level</Text>
            </View>
          </View>

          <View style={styles.taskList}>
            <Text style={styles.sectionTitle}>Available Tasks</Text>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <View key={task.id} style={styles.taskItem}>
                  <View style={styles.taskDetails}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskDescription}>{task.description}</Text>
                  </View>
                  <Text style={styles.taskPoints}>{task.point} points</Text>
                </View>
              ))
            ) : (
              <Text style={styles.taskDescription}>No available tasks for the moment.</Text>
            )}
          </View>

          <View style={styles.parrainageBox}>
            <Text style={styles.sectionTitle}>Parrainage</Text>
            <View style={styles.parrainageInputContainer}>
              <TextInput 
              placeholder="Utiliser un code d’un ami" 
              style={styles.input}
              value={FriendCode}
              //editable={false} // Disable input
              //selectTextOnFocus={false} // Prevents selection of text on focus
              onChangeText={setFriendCode} />
              <TouchableOpacity style={styles.parrainageButton}
              onPress={parriner}
              >
                <Text style={styles.buttonText}>Parriner</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.parrainageInputContainer}>
              <TextInput 
              editable={false} // Disable input
              selectTextOnFocus={false} // Prevents selection of text on focus
              value = {val}
              placeholder="Partager Votre Code" 
              style={styles.customTextStyle} />
              <TouchableOpacity style={styles.parrainageButton}
              onPress={generer}
              >
                <Text style={styles.buttonText}>Générer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.parrainageButton}
              onPress={partager}
              >
                <Ionicons name="copy" size={24} color="white" 
                style={{marginTop:-2}} />
                
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
   customTextStyle: {
    color: 'black', // Set text color to black
    fontWeight: 'bold', // Make text bold
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Softer background color for better contrast
  },
  scrollContent: {
    padding: 20,
  },

  header: {
    display: 'flex',
    position: 'static',
    top: '-2%',
    left: '-7%',
    width: '110%',
    padding : 10,
    height: 150, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay to make text more readable
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  silverText: {
    fontSize: 16,
    color: '#FFCFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pointsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000', // Adds shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Adds shadow effect for Android
  },
  pointsItem: {
    alignItems: 'center',
  },
  pointsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  taskList: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  taskDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  taskPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
  },
  parrainageBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  parrainageInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#F8F8F8', // Light background for input fields
  },
  parrainageButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 10,
  },



  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});


export default GamificationScreen;
