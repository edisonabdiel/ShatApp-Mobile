## ShatApp Mobile

<p align="center">
    Just another chat app for mobile devices built with React Native.
  </p>

  </br>

<p align="center" width="4000x" >

![simulator_screenshot_E016DFBF-3B3E-4625-8000-241D95520B62](https://user-images.githubusercontent.com/43752457/128925597-c3e3643b-08a8-42fb-9ef7-9f21be416be0.png)


</p>

## Objective

To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## The 5 Ws

1. Who—The users of the mobile chat app. These could be friends, family or other
students on this course. Your codebase will be used by other developers working on
the product.
2. What—A native chat app built with React Native, as well as all the relevant
documentation.
3. When—Whenever users of your chat app want to communicate with each other.
4. Where—The app will be optimized for both Android and iOS devices. You will use
Expo to develop the app and Google Firestore to store the chat messages.
5. Why—Mobile chat apps are among the most commonly downloaded and used apps
in the world, so knowing how to build a chat app is an indispensable skill. The app
will demonstrate your React Native development skills.

## Key features

● A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
</br>
● A page displaying the conversation, as well as an input field and submit button.
</br>
● The chat must provide users with two additional communication features: sending images
and location data.
</br>
● Data gets stored online and offline.

## Stack

- React Native
- Expo
- GiftedChat
- Firebase
- XCode
- Visual Studio Code

### Dependencies

- async-storage
- expo
- firebase
- netinfo
- react
- react-native
- react-native-async-storage
- react-native-gifted-chat
- react-native-maps
- react-navigation

### Dev Dependencies

- babel
- eslint

<!-- GET STARTED -->
## Get Started

### Setting up

To develop and test native apps with [React Native](https://reactnative.dev/), Facebook recommends using [Expo](https://docs.expo.io/get-started/installation/).

Expo is an open-source platform for making universal native apps that run on Android, iOS, and the web. There are two tools that you need to develop apps with Expo: a command line app called [Expo CLI](https://docs.expo.io/workflow/expo-cli/) to initialize and serve your project and a mobile client app called [Expo Go](https://docs.expo.io/guides/sharing-preview-releases/#expo-go) to open it on iOS and Android. To install Expo CLI on your computer, you need to have previously installed [Node.js](https://nodejs.org/) (LTS release).

```
npm install --global expo-cli
```

If you want to test the app on a mobile device, you must also install the Expo Go application on the mobile device.

- [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android Lollipop and greater)
- [OS App Store](https://itunes.com/apps/exponent) (iOS 11 and greater)

### Dependencies installation

Install all dependencies listed in package.json in the local node_modules folder with the following npm command:

```
npm install
```

### Configuration

Once you have the project on your computer, and you have installed Expo CLI and all the dependencies, you can start using (and modifying) the project.

In order to use the cloud storage, you need to have a [Firebase](https://firebase.google.com/) account and create a new project for the app. Once inside the new project created, you must enable authentication with at least the anonymous option activated, so that users can use the app. To do this, you must go to the "Authentication" option in the Firebase main menu.

To save the messages sent by users, you must create a collection in Cloud Firestore. To do this, you must go to the "Firestore Database" option in the Firebase main menu.

Finally, you must go to the project configuration, and in the "General" tab you will find the SDK Configuration. You must copy the configuration code of your Firebase service into the "Chat" component of the app. The configuration code in both Firebase and the app looks like this:

```
const firebaseConfig = {
  apiKey: "AIzaSyBJUhdfwOjoFdfBAaGfebCbvb2NCoRZtmY",
  authDomain: "shatapp-1d6c7.firebaseapp.com",
  projectId: "shatapp-1d6c7",
  storageBucket: "shatapp-1d6c7.appspot.com",
  messagingSenderId: "23794753192",
  appId: "1:23794753192:web:b856a0b76ff94328832c9d",
  measurementId: "G-HHSTQ6X7D2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

### Run it

To run the app, you can use the following commands:

```
expo start
```
```
npm start
```

Expo will start automatically and will give you several options to run, including the option to launch the app in a virtualized operating system that you have open at that moment (for example, with [Android Studio](https://developer.android.com/)).
