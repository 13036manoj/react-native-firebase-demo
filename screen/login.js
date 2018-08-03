// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
     facebookLogin = async () => {
        try {
          const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      
          if (result.isCancelled) {
            throw new Error('User cancelled request'); // Handle this however fits the flow of your app
          }
      
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
      
          // get the access token
          const data = await AccessToken.getCurrentAccessToken();
      
          if (!data) {
            throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
          }
      
          // create a new firebase credential with the token
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      
          // login with credential
          const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
             if(currentUser.user){

                this.props.navigation.navigate('Main')
             }
          console.log(JSON.stringify(currentUser.user.toJSON()))
        } catch (e) {
          console.error(e);
          // alert(JSON.stringify(e))
        }
      }
     // Calling this function will open Google for login.
 googleLogin = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      if(currentUser.user){
        console.log(' currentUser of google login',currentUser);
        this.props.navigation.navigate('Main')
     }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          title="login with facebook"
          onPress={() => this.facebookLogin()}
        />
         <Button
          title="login with google"
          onPress={() => this.googleLogin()}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})