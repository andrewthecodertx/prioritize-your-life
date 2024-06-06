import React, { useContext, useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import AppLink from "@/components/app_components/AppLink";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail } from "./utilities";

export default function ResetPassword() {
  const { isAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState<string>("");

 useEffect(() => {
  if (isAuthenticated) {
    router.push("/");
  }
 }, [isAuthenticated]);

  const onSubmit = () => {
    try {
      email.toLocaleLowerCase();
      if (!isValidEmail(email)) {
        alert("Invalid email address. Please try again.");
        return;
      }
      const firebase = getFireApp();
      if (!firebase) throw new Error("Firebase app not initialized");
      if (!("auth" in firebase))
        throw new Error("Firebase app does not have 'auth' property");
      firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent.");
      router.push("/signin");
      setEmail("");
    } catch (error: any) {
      const errorMessage =
        "Error resetting password: " +
        (error.message ?? "Unknown error occurred.");
      console.error(errorMessage + "\nStackTrace: " + error.stack);
      alert(errorMessage);
    }
  };
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
      <AppTouchableOpacity onPress={onSubmit}>
        Reset Password
      </AppTouchableOpacity>

      <AppLink to="./signin">Sign In</AppLink>
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});