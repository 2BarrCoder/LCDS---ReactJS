// Define the base URL once at the top of the file
const BASE_URL = 'http://192.168.0.102/CasaDeselfi/CasaDeselfi/backend';

// Export utility functions
export const checkSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/check_session.php`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Connection error');
  }
};

export const logOut = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout.php`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Connection error');
  }
};

export const getGamificationProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getGamification_profile.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gamification profile:', error);
    return { success: false, message: 'Network error' };
  }
};

export const joinGamification = async () => {
  try {
    const response = await fetch(`${BASE_URL}/joinGamification.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const responseText = await response.text();
    console.log('Raw Response:', responseText);
    const data = JSON.parse(responseText);
    if (data.success) {
      return data;
    } else {
      console.error('Failed to join gamification:', data.message);
      return data;
    }
  } catch (error) {
    console.error('Error joining gamification:', error);
    return { success: false, message: 'Error joining gamification' };
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getTasks.php`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const rawData = await response.text();
    const data = JSON.parse(rawData);

    if (data.success) {
      return { success: true, tasks: data.tasks };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { success: false };
  }
};

export const scheduleAppointment = async (appointmentDetails) => {
  try {
    const formData = new URLSearchParams(appointmentDetails).toString();

    const response = await fetch(`${BASE_URL}/appointement.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to schedule appointment');
    }

    const responseJson = await response.json();
    return responseJson.message;
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};

export const sub = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/subscribe.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Email': email,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error Subscription:', error);
    return { success: false, message: 'Network error' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Server connection error' };
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'Failed to connect to the server' };
  }
};

export const updateUser = async (userData) => {
  try {
    // Convert userData object to URL-encoded string format
    const formBody = new URLSearchParams(userData).toString();

    const response = await fetch(`${BASE_URL}/update_user.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // URL-encoded content type
      },
      body: formBody, // Use URL-encoded form body
    });

    if (!response.ok) {
      console.log('An error occurred in the server response.');
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error during user update:', error);
    return { success: false, message: 'Failed to connect to the server' };
  }
};

export const deleteAcc = async () => {
  try {
    const response = await fetch(`${BASE_URL}/delete_account.php`, {
      method: 'POST', // Adjust the method if necessary
      headers: {
        'Content-Type': 'application/json',
      },
       // Include credentials if needed
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is valid JSON
    const data = await response.json();

    // Check if the response indicates success
    if (data.success) {
      return { success: true, data };
    } else {
      return { success: false, message: data.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error Deleting account:', error);
    return { success: false, message: 'Network error or server issue.' };
  }
};

export const updateCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/update_code.php`, {
      method: 'POST', // Adjust the method if necessary
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is valid JSON
    const data = await response.json();

    // Check if the response indicates success
    if (data.success) {
      return { success: true, data };
    } else {
      return { success: false, message: data.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error Updating Code :', error);
    return { success: false, message: 'Network error or server issue.' };
  }

};

export const updateFriendCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/update_Friendcode.php`, {
      method: 'POST', // Adjust the method if necessary
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is valid JSON
    const data = await response.json();

    // Check if the response indicates success
    if (data.success) {
      return { success: true, data, message : data.message };
    } else {
      return { success: false, message: data.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error Updating Code :', error);
    return { success: false, message: 'Network error or server issue.' };
  }

};

export const Friends = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/getFriends.php`, {
      method: 'POST', // Adjust the method if necessary
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is valid JSON
    const data = await response.json();

    // Check if the response indicates success
    if (data.success) {
      return { success: true, data };
    } else {
      return { success: false, message: data.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error getting friends :', error);
    return { success: false, message: 'Network error or server issue.' };
  }

};

export const updateLevel = async (level) => {
  try {
    const response = await fetch(`${BASE_URL}/update_Level.php`, {
      method: 'POST', // Adjust the method if necessary
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is valid JSON
    const data = await response.json();

    // Check if the response indicates success
    if (data.success) {
      return { success: true, data };
    } else {
      return { success: false, message: data.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error getting friends :', error);
    return { success: false, message: 'Network error or server issue.' };
  }

};

export const Pay = async (amount) => {
  try {
    const response = await fetch(`${BASE_URL}/store_payment.php`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    if (data.success) {
      return { success: true, data };
    } else {
      return { success: false, message: data.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error getting friends :', error);
    return { success: false, message: 'Network error or server issue.' };
  }

};

// api.js

export const fetchGalleries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getGalerie.php`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching galleries:', error);
    throw error; // Re-throw error to handle it in the component
  }
};
