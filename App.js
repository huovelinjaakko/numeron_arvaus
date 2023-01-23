import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {

  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const [guess, setGuess] = useState();

  const [oldGuess, setOldGuess] = useState();

  const [feedback, setFeedback] = useState('')

  const [attempts, setAttempts] = useState(1);

  const guessPressed = () => {

    setOldGuess(guess)

    setAttempts(attempts + 1);

    if (guess < randomNumber) {
      setFeedback('Low')
    } else if (guess > randomNumber) {
      setFeedback('High')
    } else if (guess == randomNumber) {
      setFeedback('Correct')
      Alert.alert("Congratulations!" , "You guessed the number in " + attempts + " guesses",
        [
          {text: 'Play again', onPress: restartApp}
        ]
      )
    }
  }

  const restartApp = () => {
    setAttempts(1);
    setFeedback('');
    setOldGuess();
    setGuess();
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }

  return (
    <View style={styles.container}>
      {feedback == '' && <Text style={styles.text}>Guess a number between 1-100</Text>}
      {feedback == 'Low' && <Text style={styles.text}>Your guess {oldGuess} is too low!</Text>}
      {feedback == 'High' && <Text style={styles.text}>Your guess {oldGuess} is too high!</Text>}
      {feedback == 'Correct' && <Text style={styles.text}>Your guess {oldGuess} is correct!</Text>}
      <TextInput keyboardType='numeric' style={styles.input} placeholder='Type your guess' onChangeText={guess => setGuess(guess)} value={guess} />
      <Button onPress={guessPressed} title="Make a guess" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1 
  },
  text: {
    fontWeight: 'bold',
  }
});
