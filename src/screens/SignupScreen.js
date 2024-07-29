import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: email, // Assuming you are using email as the username
        password,
      });
      if (response.status === 201) {
        navigation.navigate('Login');
      } else {
        setErrorMessage('Failed to sign up');
      }
    } catch (error) {
      setErrorMessage('Failed to sign up');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          value={position}
          onChangeText={setPosition}
        />
        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          value={employeeId}
          onChangeText={setEmployeeId}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Button title="Sign Up" onPress={handleSignup} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to bottom, #470156, #860592, #e65df3, #ffffff)',
  },
  signupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
