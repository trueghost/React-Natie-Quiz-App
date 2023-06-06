import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);


  return (
    <View style={styles.container}>
      <View style={[styles.timerWrapper, timer < 11 && styles.timerWrapperRed]}>
        <View style={[styles.timerCircle, timer < 11 && styles.timerCircleRed]}>
          <Text style={[styles.timerText, timer < 11 && styles.timerTextRed]}>
            {timer}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 5,
  },
  timerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerWrapperRed: {
    borderColor: "red",
  },
  timerCircle: {
    width: 48,
    height: 48,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  timerCircleRed: {
    borderColor: "red",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  timerTextRed: {
    color: "red",
  },
});
