import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";

const OrderScreen = ({ navigation }) => {
  const handleGoHome = () => {
    // Implement the navigation logic to navigate to the home screen
    navigation.replace("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleGoHome}
      >
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>

      <LottieView
        source={require("../assets/thumbs.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text style={styles.text}>Your order has been placed!</Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  animation: {
    height: 360,
    width: 300,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  text: {
    marginTop: 40,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});
