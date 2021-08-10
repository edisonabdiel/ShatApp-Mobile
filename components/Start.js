// React modules
import React, { useState, useEffect } from 'react';
// React Native Components
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

// Set the Background Image
const background = require('../assets/BackgroundImage.png');
// Background color options 
const colors = ['#292E49', '#E2D1C3', '#C3CFE2', '#FFFFFF'];

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      backgroundColor: '#FFF',
    }
  }

  render() {
    const setColor = this.state.backgroundColor;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>ShatApp!</Text>
          </View>
          <View style={styles.wrapper}>
            <TextInput
              style={styles.namefield}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Enter your name here...'
            />
            <Text style={styles.text}>Select a Background Color:</Text>
            <View style={styles.colorsMenu}>
              {colors.map((selectedColor) => (
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select Background Color"
                  accessibilityHint="Sets your chat screens background color."
                  accessibilityRole="button"
                  key={selectedColor}
                  style={[
                    styles.colorOptions(selectedColor),
                    setColor === selectedColor ? styles.border : null,
                  ]}
                  activeOpacity={0.5}
                  onPress={() => this.setState({ backgroundColor: selectedColor })}
                />
              ))}
            </View>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Chat"
              accessibilityHint="Takes you to the chat screen."
              accessibilityRole="button"
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}>
              <Text style={styles.text}>
                Start Chatting
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  titleWrapper: {
    flex: 0.4,
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#000',
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Zapfino',

  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'AmericanTypewriter-Bold',
  },
  namefield: {
    backgroundColor: '#ccc',
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: '80%',
    height: '80%',
    flex: 0.6,
    alignItems: 'center',
    marginBottom: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  colorsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOptions: (selectedColor) => ({
    backgroundColor: selectedColor,
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 50,
  }),
  border: {
    borderWidth: 2,
    borderColor: '#EC77AB',
  },
  button: {
    width: '50%',
    borderRadius: 50,
    height: 40,
    backgroundColor: '#ccc',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
  },
});