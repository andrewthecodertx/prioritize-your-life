import Toast from "react-native-toast-message";
import { getFirebase } from "@/app/common/get-firebase";
import { isValidEmail, isValidPassword, validateAuthFormInput } from "../utilities";
import {
    HandleResetPasswordProps,
    SignInProps,
    SignUpProps,
} from "@/app/types";

export const handleResetPassword = async ({
    email,
}: HandleResetPasswordProps) => {
    if(email === "") {
        throw new Error("Email is required.");
    }
    if (!isValidEmail(email)) {
        throw new Error("Invalid email address.");
    }
    try {
        const firebase = await getFirebase();
        await firebase.auth().sendPasswordResetEmail(email);
    } catch (error: any) {
        throw new Error("Error resetting password", error.message ?? error);
    }
};

export const handleSignIn = async ({ email, password }: SignInProps) => {
    if (!email) {
        throw new Error("Email is required.");
    }
    if (!password) {
        throw new Error("Password is required.");
    }
    const { isValid, message } = validateAuthFormInput(email, password);
    if (!isValid) {
        throw new Error(message);
    }
    try {
        const firebase = await getFirebase();
        const userCreds = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        if (userCreds) {
            return userCreds.user.uid;
        }
    } catch (error: any) {
        throw new Error("Error signing in." + error.message  ?? error);
    }
};

export const handleSignUp = async ({
    email,
    confirmPassword,
    password,
}: SignUpProps) => {
    if (!email) {
        throw new Error("Email is required.");
    }
    if (!isValidEmail(email)) {
        throw new Error("Invalid email address.");
    }
    if (!password) {
        throw new Error("Password is required.");
    }
    if(!isValidPassword(password)) {
        throw new Error("Invalid password");
    }
    if (!confirmPassword) {
        throw new Error("Password confirmation is required.");
    }
    if(!isValidPassword(password)) {
        throw new Error("Invalid password");
    }
    if (confirmPassword !== password) {
        throw new Error("Passwords do not match.");
    }
    
    const { isValid, message } = validateAuthFormInput(
        email,
        password,
        confirmPassword
    );
    if (!isValid) {
        throw new Error(message);
    }

    try {
        const firebase = await getFirebase();
        const userCreds = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        if (userCreds) {
            return userCreds.user.uid;
        }
    } catch (error: any) {
        throw new Error("Error signing up." + error);
    }

};
