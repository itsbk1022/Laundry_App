import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        setLoading(false);
      }
      if(authUser){
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  },[])

  const login = () => {

    if (email === "" || password === "") {
      // Show alert if any field is empty
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
      return;
    }

    setLoading(true); // Start loading indicator
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        setLoading(false); // Stop loading indicator
        const user = userCredential.user;
        // Do something with the user data
      })
      .catch((error) => {
        Alert.alert(
          "Alert!!!",
          error.message,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false })
        setLoading(false); // Stop loading indicator
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Sign In</Text>

            <Text style={styles.subtitle}>Sign in to your account</Text>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#666"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#666"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="key-outline" size={24} color="#666" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#666"
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              onPress={login}
              style={styles.button}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.signupLink}
            >
              <Text style={styles.signupLinkText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#662d91",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#318CE7",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
    width: 200,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
  },
  signupLinkText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
