import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState({ firstName: '' });
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [adminPanel, setAdminPanel] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const employeeId = 'your-employee-id'; // Replace with actual logic to get employeeId
      if (employeeId) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${employeeId}`);
          if (response.status === 200) {
            const userDetails = response.data;
            setUser(userDetails);
            setTimeout(() => {
              setWelcomeMessage(false);
              setTimeout(() => {
                setAdminPanel(true);
              }, 500); // 0.5 seconds delay before showing admin panel
            }, 3000); // 3 seconds delay before fading out welcome message
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={styles.welcomeContainer}>
        {welcomeMessage && (
          <Text style={styles.welcomeMessage}>Welcome, {user.firstName}</Text>
        )}
        {adminPanel && (
          <Text style={styles.adminPanel}>{user.firstName} - ADMIN PANEL DASHBOARD</Text>
        )}
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Sales</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Income</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Additional Stats</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>More Stats</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Other Stats</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  adminPanel: {
    fontSize: 18,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
