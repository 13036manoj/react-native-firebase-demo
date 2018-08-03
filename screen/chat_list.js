import React from 'react';
import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
// import { List, ListItem,SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase'
var db = firebase.firestore();
var unsubscribe = db.collection("users").onSnapshot(function (querySnaphot) {
    // do something with the data.
  });
var userId='';

export default class ChatList extends React.Component {
 constructor(props){
  super(props)
  this.state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
  };
 

 } 

   componentDidMount(){
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          this.makeRemoteRequest(user.uid);
          userId=user.uid
        }
      })
    //  console.log('after getting user id',userId)
    
 }
 makeRemoteRequest=(userIdArg)=>{
   db.collection('users').doc(userIdArg).get().then((doc)=>{
     console.log(doc.data())
     this.state.data=doc.data().threads
     this.setState({
       data:this.state.data
     })
   })
   .catch((error)=>{
     console.log('error in chat list page 1',error)
   })

//   const { page, seed } = this.state;
//   const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
//   this.setState({ loading: true });
//   fetch(url)
//     .then(res => res.json())
//     .then(res => {
//       this.setState({
//         data: page === 1 ? res.results : [...this.state.data, ...res.results],
//         error: res.error || null,
//         loading: false,
//         refreshing: false
//       });
//     })
//     .catch(error => {
//       this.setState({ error, loading: false });
//     });
 }
 renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );
}
// renderHeader = () => {
//   return <SearchBar placeholder="Type Here..." lightTheme round />;
// }
renderFooter = () => {
  if (!this.state.loading) return null;

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
};
// handleRefresh=()=>{
//   this.setState({
//     page:1,
//     refreshing:true,
//     seed:this.state.seed+1
//   },()=>{
//     this.makeRemoteRequest();
//   })
// }

// handleEndReach1=()=>{
//   this.setState({
//     page:this.state.page+1
//   },
//   ()=>{
//     this.makeRemoteRequest();
//   }
// )
// }
componentWillUnmount(){
    unsubscribe();
}
moveToChatPage=(threadId)=>{
      this.props.navigation.navigate('Chating',{threadId:threadId,userId:userId})
}
addThreads=()=>{
  let threadsIdRef=db.collection('threads').add({
                                          details:{
                                            createdAt:121324235,
                                            crreaterId:userId,
                                            lastMsgAt:24234325345,
                                            name:'con.2',
                                            type:1
                                            },
                                      users:[userId]
                   }).then((docRef)=>{
                       docRef.collection('messages').add({
                                            createdAt:1232435456,
                                            payload:'firs initial msg',
                                            senderId:''
                       })
                      console.log(' success in add method 1',docRef)

                   })
                   .then((docRef)=>{
                      console.log(' success in add method 2',docRef)
                   })
                   .catch((error)=>{
                     console.log(' erro in add method',error)
                   })

        // another aproach not working

        
        

  // threadsIdRef.doc(threadsIdRef.id).set({
                 
  //                   })
  //                 .then(()=>{
  //                   console.log('success in add threads 1',error)
  //                    })
  //                 .catch((error)=>{
  //                   console.log('error in add threads 1',error)
  //                 })   
  // let messageIdref=threadsIdRef.doc(threadsIdRef.id).collection('messages').document();
  //   messageIdref.doc(messageIdref.id).set({
  //                     createdAt:1232435456,
  //                     payload:'firs initial msg',
  //                     senderId:''
  //                })
  //                .then((res)=>{
  //                 console.log('success in add threads 2',error)
  //                })
  //                .catch((error)=>{
  //                 console.log('error in add threads 2',error)
  //                })

  
}
joinThreads=()=>{
  console.log('we will update join method as sooon as possible')
}

  render() {
    return (
      <View
      style={{flex:1}}
      >

    <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity style={{flex:1,backgroundColor:`#7f7f7f`}} onPress={()=>this.addThreads()}>
                       <Text style={{flex:1}}>Add threads + </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,backgroundColor:`#7f7f7f`}} onPress={()=>this.joinThreads(Val)}>
                       <Text style={{flex:1}}>Join threads  </Text>
                  </TouchableOpacity>
        </View>

        <View style={{flex:9,marginTop:20}}>
          { this.state.data.map((Val,key)=>{
            console.log('in map ',Val)
            return(
              <View style={{flex:1}}>
                  <TouchableOpacity style={{flex:1,backgroundColor:`yellow`}} onPress={()=>this.moveToChatPage(Val)}>
                       <Text style={{flex:1}}>{Val} </Text>
                  </TouchableOpacity>
              </View>
            )

          })}
        </View>
       {/* <FlatList
       data={this.state.data}
       renderItem={({ item }) => (
        <View>
           <TouchableOpacity onPress={()=>this.moveToChatPage(item)}>
                <Text>{item} </Text>
             </TouchableOpacity>
          </View>
        )}
         keyExtractor={(item)=>item}
         ItemSeparatorComponent={this.renderSeparator}
        //  ListHeaderComponent={this.renderHeader}
        //  ListFooterComponent={this.renderFooter}
        //  refreshing={this.state.refreshing}
        //  onRefresh={this.handleRefresh}
        //  onEndReached={this.handleEndReach1}
        //  onEndReachedThreshold={1}
       /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});