import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  const soundObject = new Audio.Sound();

  const correctSound = async () => {
  try {
    await soundObject.loadAsync(require('../assets/correct.mp3'));
    await soundObject.playAsync();
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

const wrongSound = async () => {
  try {
    await soundObject.loadAsync(require('../assets/wrong.mp3'));
    await soundObject.playAsync();
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswerStatus(null);
  }, [data, questionNumber]);

  const handleClick = (a) => {
    if (isAnswered) return;

    setSelectedAnswer(a);
    setIsAnswered(true);
    setAnswerStatus(a.correct ? "correct" : "wrong");

      if (a.correct) {
        correctSound();
        setTimeout(() => {
          setQuestionNumber((prev) => prev + 1);
        }, 4000);
        
      } else {
        wrongSound();
        setTimeout(() => {
          setStop(true);
        }, 4000);
      }
    
  };

  const renderAnswerText = (a) => {
    if (isAnswered && a === selectedAnswer) {
      return a.correct ? "Correct!" : "Wrong!";
    } else {
      return a.text;
    }
  };

  return (
    <View style={styles.trivia}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question?.question}</Text>
      </View>
      <View style={styles.answersContainer}>
        {question?.answers.map((a) => (
          <TouchableOpacity
            key={a.text}
            style={[
              styles.answer,
              selectedAnswer === a && styles.selectedAnswer,
              isAnswered && a.correct && styles.correctAnswer,
              isAnswered && !a.correct && selectedAnswer === a && styles.wrongAnswer,
            ]}
            onPress={() => handleClick(a)}
            disabled={isAnswered}
          >
            <Text style={styles.answerText}>{renderAnswerText(a)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = {
  trivia: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "#100241",
    padding: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    color: "white",
  },
  answersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  answer: {
    width: "45%",
    padding: 10,
    margin: 5,
    backgroundColor: "#100241",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  answerText: {
    fontSize: 16,
    color: "white",
  },
  selectedAnswer: {
    backgroundColor: "gold",
  },
  correctAnswer: {
    backgroundColor: "green",
  },
  wrongAnswer: {
    backgroundColor: "crimson",
  },
};
