import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import CustomActions from './CustomActions';
// React Native async-storage.
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Native Network Info (NetInfo).
import NetInfo from '@react-native-community/netinfo';
// GiftedChat.
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// React Native Map component for mobile devices.
import MapView from 'react-native-maps';
// Firebase + Firestore.
import firebase from '../utilities/firebase';


export default function Chat(props) {
  // Get color parameter from Start component to set background color.
  const backgroundColor = props.route.params.backgroundColor;
  // Get user name from Start component.
  const name = props.route.params.name;
  // Set chat messages.
  const [messages, setMessages] = useState([]);
  // Set user ID (authentication).
  const [uid, setUid] = useState('');
  // Set user connection status.
  const [isConnected, setIsConnected] = useState(false);

  // Listen for updates in Firestore messages collection.
  const referenceChatMessages = firebase.firestore().collection('messages');

  // Asynchronous function to get messages from asyncStorage.
  const getMessages = async () => {
    let messages = '';
    let uid = '';
    try {
      // Get data from asyncStorage.
      messages = (await AsyncStorage.getItem('messages')) || [];
      uid = await AsyncStorage.getItem('uid');
      // Set user ID from asyncStorage.
      setUid(JSON.parse(uid));
      // Set messages from asyncStorage.
      setMessages(JSON.parse(messages));
    } catch (error) {
      console.error(error);
    }
  };

  // Asynchronous function to save messages in asyncStorage.
  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error(error);
    }
  };

  // Asynchronous function to delete user messages stored in asyncStorage.
  // ! This function is only used in the development environment.
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Void functions to unmount when the app is offline.
    let authUnsubscribe = () => {};
    let unsubscribe = () => {};

    // Check if the user is online or offline.
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // User is online.
        console.log('App is online');
        setIsConnected(true);

        // Authenticate via Firebase.
        authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          // First check if the user is signed in. If not, create a new user.
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          // Assign an ID to the user.
          setUid(user.uid);
          // Store the user ID in asyncStorage.
          AsyncStorage.setItem('uid', JSON.stringify(user.uid));

          setMessages([]);
        });

        unsubscribe = referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(onCollectionUpdate);
      } else {
        // User is offline.
        console.log('App is offline');
        setIsConnected(false);

        // Load and display the messages from asyncStorage.
        getMessages();

        // send alert to the user about connection status.
        Alert.alert(
          'Please check your internet connection.',
          'The app is not connected to Internet. You will need access to receive and send new messages. For now you can use the app in read mode.',
        );
      }
    });

    // Unmount.
    return () => {
      // Stop receiving updates about a collection.
      unsubscribe();
      // Stop authentication request.
      authUnsubscribe();
    };
  }, []);

  // Render the real-time changes of the collection with querySnapshot.
  const onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through all the documents in the collection.
    querySnapshot.forEach((doc) => {
      // Save the fields of each document.
      const data = doc.data();

      // Add the data extracted from the collection to the array.
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    // Set the message array with the updated data from Firestore.
    setMessages(messages);
  };

  // Get the new message written by the user.
  const onSend = (messages = []) => {
    // Append the new message to the chat screen.
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages.messages, messages),
    );

    // Each new message written by the user is sent in the first index of the array.
    addMessage(messages[0]);
    // Save messages in asyncStorage.
    saveMessages();
  };

  // Store new message in Firestore.
  const addMessage = (message) => {
    referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  // Edit chat conversation bubbles.
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        // Background color.
        wrapperStyle={{
          left: {
            backgroundColor: '#F5F5F5',
          },
          right: {
            backgroundColor: '#73BA9B',
          },
        }}
        // Text color.
        textStyle={{
          left: {
            color: '#000000',
          },
          right: {
            color: '#000000',
          },
        }}
      />
    );
  };

  // Render InputToolbar if the user is online.
  const renderInputToolbar = (props) => {
    if (isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  // Render CustomActions buttons.
  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // Render a custom view for location data.
  const renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 10, margin: 2 }}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container(backgroundColor)}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      {/* GiftedChat component. */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        isConnected={isConnected}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          /* Authenticated ID of the signed user. */
          _id: uid,
          /* Name of the user typed in the Start component. */
          name: name,
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // App container.
  container: (backgroundColor) => ({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    justifyContent: 'space-evenly',
  }),
});