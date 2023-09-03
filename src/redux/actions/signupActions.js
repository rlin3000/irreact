// Add Firebase authentication-related functions here
// You'll need to use the Firebase SDK to implement these functions
// For example, login, logout, etc.

// Example login function using Firebase
// import firebase from 'firebase';

import auth from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

// Function to save login state and user data in local storage
const saveUserDataToLocalStorage = (user) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(user));
};

// Function to remove login state and user data from local storage
const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
};

export const signup = (email, password) => async (dispatch) => {
  try {
    // Use Firebase's authentication API to log in
    // const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user.accessToken)
    console.log(userCredential.user.email)

    // For this example, we'll assume you get the user object from Firebase
    const user = { email: userCredential.user.email, accessToken: userCredential.user.accessToken };

    saveUserDataToLocalStorage(user);

    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: user,
    });
  } catch (error) {
    // Handle login error
    dispatch({
      type: 'SIGNUP_FAILED',
      payload: error.code
    });
  }
};

export const signupInit = () => async (dispatch) => {
  try {
    // Use Firebase's authentication API to log out
    // await firebase.auth().signOut();
    removeUserDataFromLocalStorage();

    dispatch({ type: 'SIGNUPINIT' });
  } catch (error) {
    // Handle logout error
  }
};