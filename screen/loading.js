import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase';
import   { Notification, NotificationOpen, } from 'react-native-firebase';
export default class Loading extends React.Component {
   async componentDidMount() {
    
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        // user has permissions
        console.log('user has permission',enabled)
    } else {
      try {
      let requesting_permission =  await firebase.messaging().requestPermission();
      console.log('requesting_permission',requesting_permission)
        // User has authorised
    } catch (error) {
        // User has rejected permissions
        console.log(' permission rejected or error',error)
    }
    }
    //     Listen for Notifications
      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.log(' Listen for Notifications',notification)

        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
         console.log(' Listen for Notifications',notification)
        // Process your notification as required
    });
    



    // Listen for a Notification being opened
            // for foreground and background
                this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
                 console.log('for foreground and background being  opened',notificationOpen)
                            
                  // Get the action triggered by the notification being opened
                  const action = notificationOpen.action;
                  // Get information about the notification that was opened
                  const notification = notificationOpen.notification;
              });

            // for app closed

              const notificationOpen = await firebase.notifications().getInitialNotification();
                if (notificationOpen) {
                
                   console.log('for closed state being  opened',notificationOpen)
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    const notification = notificationOpen.notification;
                }


    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login')
    })
      }
      componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }
  render() {
    return (
      <View style={styles.container}>
          <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }


})