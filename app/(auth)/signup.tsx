import React, { useContext, useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import AppLink from "@/components/app_components/AppLink";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, validateFormInput, isValidPassword } from "./utilities";


/**
 * A component that renders a sign-up form.
 */
const SignUp = () => {
  const { isAuthenticated, setIsLoading, setIsAuthenticated } =
    useContext(AppContext);
    
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUp = async () => {
    try {
      if (!validateFormInput(email, password, confirmPassword)) {
        alert("Invalid email address or password. Please try again.");
        return;
      }
      setIsLoading(true);

      const firebase = await getFireApp();
      if (!firebase) throw new Error("Firebase app not initialized");

      const userCreds = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (userCreds) {
        setIsAuthenticated(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setIsLoading(false);
        throw new Error("User not found");
      }
    } catch (error: any) {
      const errorMessage =
        "Error signing up:" + (error.message ?? "Unknown error occurred");
      console.error(errorMessage + "\nStackTrace: " + error);
      setIsLoading(false);
      alert(errorMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <AppThemedView style={styles.container}>
      <AppThemedTextInput
        checkValue={isValidEmail}
        iconName="mail"
        placeholder="Email"
        secureEntry={false}
        setValue={setEmail}
        value={email}
      />
      <AppThemedTextInput
        checkValue={isValidPassword}
        placeholder="Password"
        secureEntry={true}
        setValue={setPassword}
        value={password}
      />
      <AppThemedTextInput
        checkValue={isValidPassword}
        placeholder="Password"
        secureEntry={true}
        setValue={setConfirmPassword}
        value={confirmPassword}
      />
      <AppTouchableOpacity onPress={signUp}>Sign Up</AppTouchableOpacity>
      <AppLink to="./signin">Sign In</AppLink>
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default SignUp;
