// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View,TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
var db = firebase.firestore();
var firebase_msg=firebase.messaging();
var unsubscribe = db.collection("users").onSnapshot(function (querySnaphot) {
    // do something with the data.
  });
export default class Main extends React.Component {
  state = { currentUser: null , users:['manoj'],isLogoutError:false,error_details:''}
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase_msg.getToken().then((token) => {
       console.log('token in main page ',token)
     });
    db.collection("users").onSnapshot((querySnapshot)=> {
                this.state.users=[];
                querySnapshot.forEach((doc)=> {
                    this.state.users.push(doc.data().name);
                });
                this.setState({
                  users:this.state.users
                })
            });

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        db.collection("users").doc(currentUser.id).get()
        .then((DocRef)=>{
            DocRef.set({
                fcmToken:fcmToken
            }).then((doc)=>{
                console.log('success in on refresh token catch',doc)

            })
            .catch((error)=>{
                console.log('error in on refresh token catch',error)
            })

        })
        .catch((error)=>{
            console.log('')
        })
        // Process your token as required
    });
}
addToFireStore=()=>{
    db.collection("users").add({
     name:'from app',
     mobile:{mobile1:1234567890,mobile2:9870122345}
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
 }
logoutUser=()=>{
    firebase.auth().signOut()
        .then(function() {
            this.props.navigation.navigate('Login')
        })
        .catch(function(error) {
            this.setState({
                isLogoutError:true,
                error_details:error
            })
        });
    }
    componentWillUnmount(){
        unsubscribe()
    }
 gotoChatlist=()=>{
        this.props.navigation.navigate('ChatList');
    }
render() {
 const { currentUser } = this.state
 return (
      <View style={styles.container}>
        <View style={{flex:1}}>
            {this.state.isLogoutError &&  <Text> here error in logout {this.state.error_details}</Text> } 
                <Text>
                 Hi {currentUser && currentUser.email}!
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <TouchableOpacity onPress={this.gotoChatlist} style={{backgroundColor:'#7f7f7f'}}>
                            <Text>go to chat list page</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logoutUser} style={{backgroundColor:'#7f7f7f'}}>
                            <Text>Logout ></Text>
                    </TouchableOpacity>
               </View> 
               
         </View>
          <View style={styles.container}>
          <Text>this is chat application</Text>
             {/* <TouchableOpacity onPress={this.addToFireStore} style={{flex:1,backgroundColor:'green'}}>
                 <Text>add to fire store</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:8,justifyContent:'center',alignItems:'center'}}>
                    {
                    this.state.users.map((val,key)=>{
                        return <Text style={{flex:1}}>{val}</Text>
                    })
                    } */}
             </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})