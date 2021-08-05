import { StatusBar } from 'expo-status-bar';
// React components
import React, { Component } from 'react';
// React Native components
import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
// Custom components
import Start from './components/Start';
import Chat from './components/Chat';
// Create stack navigator
const Stack = createStackNavigator();

export default class HelloWorld extends Component {
// Iniial State
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <NavigationContainer styles={styles.container}>
       <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 20,
  }
});
