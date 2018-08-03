
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

import firebase from 'react-native-firebase';
var config = {
  apiKey: "AIzaSyDM-baYsuac1CX_0otr00pvXrGtZeU-QjY",
  authDomain: "testingfirebase-2bfc6.firebaseapp.com",
  databaseURL: "https://testingfirebase-2bfc6.firebaseio.com",
  projectId: "testingfirebase-2bfc6",
  storageBucket: "testingfirebase-2bfc6.appspot.com",
  messagingSenderId: "428644299263",
};
firebase.initializeApp(config);

// import the different screens
import Loading from './screen/loading'
import SignUp from './screen/signUp'
import Login from './screen/login'
import Main from './screen/main'
import ChatList from './screen/chat_list'
import Chating from './screen/chating'
// create our app's navigation stack
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    ChatList,
    Chating
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App


// import React from 'react';
// import { StyleSheet, Platform, Image, Text, View, ScrollView,TouchableOpacity,TouchableHighlight } from 'react-native';

// import firebase from 'react-native-firebase';
// var config = {
//   apiKey: "AIzaSyDM-baYsuac1CX_0otr00pvXrGtZeU-QjY",
//   authDomain: "testingfirebase-2bfc6.firebaseapp.com",
//   databaseURL: "https://testingfirebase-2bfc6.firebaseio.com",
//   projectId: "testingfirebase-2bfc6",
//   storageBucket: "testingfirebase-2bfc6.appspot.com",
//   messagingSenderId: "428644299263"
// };
// firebase.initializeApp(config);
// var db = firebase.firestore();

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       // firebase things?
//       users:['manoj'],
//     };
//   }

//   componentDidMount() {
//     // firebase things?
//     db.collection("users").onSnapshot((querySnapshot)=> {
//         // var cities = [];
//         this.state.users=[];
//         querySnapshot.forEach((doc)=> {
//             this.state.users.push(doc.data().name);
//         });
//         this.setState({
//           users:this.state.users
//         })
//     });
  
//   }
//   addToFireStore=()=>{
//     db.collection("users").add({
//      name:'from app',
//      mobile:{mobile1:1234567890,mobile2:9870122345}
//   })
//   .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//       console.error("Error adding document: ", error);
//   });
//   }

//   render() {
//     return (
//           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//             <View style={{flex:1}}>
//              <TouchableOpacity onPress={this.addToFireStore}>
//                 <Text style={{flex:1}}>add to fire store</Text>
//                </TouchableOpacity>
//              </View>
//              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//              {
//                this.state.users.map((val,key)=>{
//                 return <Text style={{flex:1}}>{val}</Text>
//                })
//              }
//              </View>
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   logo: {
//     height: 120,
//     marginBottom: 16,
//     marginTop: 32,
//     width: 120,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   modules: {
//     margin: 20,
//   },
//   modulesHeader: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   module: {
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   }
// });

