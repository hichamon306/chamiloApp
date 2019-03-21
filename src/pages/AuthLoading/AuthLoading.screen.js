import React from 'react';
import firebase from 'react-native-firebase';
import { View, StyleSheet, ActivityIndicator, StatusBar, Alert } from 'react-native';

type PropsType = {
  navigation: any,
  authenticationData: any,
  registerDeviceToken: () => void,
  getUserMessagesReceived: () => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AuthLoading extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    if (props.authenticationData) {
      if (!props.authenticationData.fcmToken || true) {
        firebase.messaging().getToken()
          .then((fcmToken) => {
            if (fcmToken) {
            // user has a device token
              props.registerDeviceToken(fcmToken);
            } else {
            // user doesn't have a device token yet
              console.log('unable to find token');
            }
          });
        this.createNotificationListeners();
      }
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Login');
    }
  }

  navigateToMessages() {
    this.props.navigation.navigate('Messages');
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log(title, body);
      this.props.getUserMessagesReceived();
      // this.navigateToMessages();
    });
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log(title, body);
      this.navigateToMessages();
    });
    /*
    * If your app is closed,
    * you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log(title, body);
      this.navigateToMessages();
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // process data message
      console.log(message);
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'Voir', onPress: () => this.navigateToMessages() },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default AuthLoading;
