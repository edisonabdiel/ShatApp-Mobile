// React Modules
import React from 'react';
// React-Native Components
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
// GiftedChat Components
import { GiftedChat, ChatMessage, ChatInput, ChatTypingIndicator, Bubble } from 'react-native-gifted-chat';


export default class Chat extends React.Component {


  // Initial State
  constructor() {
    super();
    this.state = {
      messages: [],
      typing: false
    }
  }

  // Sets the state with a static message
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey there',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'John Doe',
            avatar: 'https://placeimg.com/140/140/any'
          },
        },
        // System message informing about an user joining the chat room
        {
          _id: 2,
          text: `${this.props.route.params.name} entered the chat`,
          createdAt: new Date(),
          system: true,
         },
      ],
    });
  }

  // Send a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  // Render a bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
          left: {
            backgroundColor: '#CCC'
          }
        }}
      />
    )
  }

  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;
    

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        <View style={styles.chat}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          {Platform.OS === 'android' ? <KeyboardAvoidingView
            behavior="height" /> : null}
        </View>
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
  chat: {
    flex: 1,
    width: '95%',
  }
});