import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import { Platform } from "react-native";
import firebase from "@react-native-firebase/app";


export function getFireApp() {

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    appName: process.env.EXPO_PUBLIC_APP_NAME,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
    appId: "",
  };

  // Conditionally set the appId based on the platform
  if (Platform.OS === "ios") {
    firebaseConfig.appId = process.env.EXPO_PUBLIC_IOS_APP_ID || '';
  } else if (Platform.OS === "android") {
    firebaseConfig.appId = process.env.EXPO_PUBLIC_ANDROID_APP_ID || '';
  } else if (Platform.OS === "web") {
    firebaseConfig.appId = process.env.EXPO_PUBLIC_WEB_APP_ID || '';
  }

  if (!firebase.apps.find(app => app.name === firebaseConfig.appName)) {
    return firebase.initializeApp(firebaseConfig, firebaseConfig.appName);
  }
  return firebase.app(firebaseConfig.appName);
};
