import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { employeeId, password });
      if (response.status === 200) {
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Failed to log in');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          value={employeeId}
          onChangeText={setEmployeeId}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Button title="Submit" onPress={handleLogin} color="#007bff" />
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.signupButtonContainer}>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('Signup')}
            color="#007bff"
          />
        </View>
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
  loginContainer: {
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
  forgotPassword: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  signupButtonContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;
