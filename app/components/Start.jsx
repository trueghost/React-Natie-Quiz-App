import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Start({ setUserName }) {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    if (inputValue) {
      setUserName(inputValue);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.titleName}>Ultimate Gamer Quiz</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Your Gamer Tag"
          style={styles.startInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleClick} style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    color: "#F0F0F0",
  },
  titleName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  startInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  startButton: {
    backgroundColor: "gold",
    borderRadius: 5,
    padding: 10,
    width: 200,
    height: 50,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
});
