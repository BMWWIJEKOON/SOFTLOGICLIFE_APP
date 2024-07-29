import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartupScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Pulse</Text>
      <View style={styles.buttonContainer}>
        <Button title="Get started" onPress={handleGetStarted} color="#ffffff" />
      </View>
      <Image source={require('../assets/heart-logo.png')} style={styles.heartLogo} />
      <Image source={require('../assets/SOFTLOGICLOGO.png')} style={styles.logo} />
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
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#860592',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  heartLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default StartupScreen;
