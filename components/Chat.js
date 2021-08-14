// React Modules
import React from 'react';
// React-Native Components
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
// Custom Actions
import CustomActions from './CustomActions';
// GiftedChat Components
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat';

// Firebase boilerplate
import firebase from 'firebase';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBJUhdfwOjoFdfBAaGfebCbvb2NCoRZtmY",
  authDomain: "shatapp-1d6c7.firebaseapp.com",
  projectId: "shatapp-1d6c7",
  storageBucket: "shatapp-1d6c7.appspot.com",
  messagingSenderId: "23794753192",
  appId: "1:23794753192:web:b856a0b76ff94328832c9d",
  measurementId: "G-HHSTQ6X7D2"
};


export default class Chat extends React.Component {
  // Initial State
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      imgage: null,
      location: null,
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Listen for updates in Firestore messages collection.
  this.referenceChatMessages = firebase.firestore().collection('messages');
  }
  

  // Sets the state with a static message
  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: `${name}` });
    //Find out connection status
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        // Authenticates user via Firebase
        this.authUnsubscribe = firebase.auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              user: {
                _id: user.uid,
                name: name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.OnCollectionUpdate);
          });
      } else {
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // Send a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    },
    );
  }

  // Saves the massages to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages',
        JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Deletes messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }

  }

  // Reads and renders the messages from Firebase
  OnCollectionUpdate = (snapshot) => {
    const messages = [];
    snapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
          image: data.image || null,
          location: data.location || null,
        }
      });
      this.setState({
        messages: messages,
      })
    });
  }

  // Adds a new message
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // Update  messagess
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
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

   //Render the default InputTollbar when the user is online
  renderInputToolbar = props => {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      )
    }
  }

  renderCustomActions = props => {
    return <CustomActions {...props} />
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
        />
      )
    }
  }

  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;


    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        {/* <ImageBackground image={background} style={styles.bgcolor(backgroundColor)}> */}
        <View style={styles.chat}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            renderUsernameOnMessage={true}
            isConnected={this.state.isConnected}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={this.state.user}
          />
          {Platform.OS === 'android' ? <KeyboardAvoidingView
            behavior="height" /> : null}
          </View>
          {/* </ImageBackground> */}
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