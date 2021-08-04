import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
  
  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]} >
        <Text style={styles.name}>
          Welcome back: {name}
        </Text>
        <Text>Chat Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  // Brings over selected background color selected in home screen
  bgcolor: (backgroundColor) => ({
    backgroundColor: backgroundColor,
  }),
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 20,
  }
});