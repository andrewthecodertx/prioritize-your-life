import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AuthContext } from "@/store/auth/auth-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { isValidEmail, isValidPassword } from "./utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { styles } from "./styles";
import { handleSignUp } from "./apis/api";

/**
 * SignUp component.
 *
 * This component is responsible for rendering the sign up functionality.
 * It allows the user to enter their email and password to sign up.
 *
 * @returns JSX.Element
 */
export default function SignUp(): JSX.Element {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUid } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const mutation = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (uid) => {
      if (uid) {
        setUid(uid);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsAuthenticated(true);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["uid"] });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again.",
      });
    }
  });

  return (
    <AppThemedView style={styles.container}>
      <ShowIf
        condition={mutation.status === "pending"}
        render={<LoadingSpinner />}
        renderElse={
          <>
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
              placeholder="Confirm Password"
              secureEntry={true}
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
            <AppThemedTouchableOpacity
              disabled={mutation.status === "pending"}
              onPress={() =>
                mutation.mutate({ email, confirmPassword, password })
              }
            >
              Sign Up
            </AppThemedTouchableOpacity>
            <AppThemedText type="link" onPress={() => router.push("/")}>
              Sign In
            </AppThemedText>
          </>
        }
      />
    </AppThemedView>
  );
}
