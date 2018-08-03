import React from 'react';
import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableOpacity,TextInput} from 'react-native';
// import { List, ListItem,SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase'
var db = firebase.firestore();
var unsubscribe = db.collection("threads").onSnapshot(function (querySnaphot) {
    // do something with the data.
  });
var userId='';

export default class Chating extends React.Component {
 constructor(props){
  super(props)
  this.state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
    text:'',
    threadId:this.props.navigation.state.params.threadId,
    userId:this.props.navigation.state.params.userId,
  };
 

 } 

  componentDidMount(){
      console.log('props in chating page',this.props.navigation.state.params)
      db.collection("threads").doc(this.state.threadId).collection('messages').onSnapshot((querySnapshot)=> {
        this.state.data=[];
        querySnapshot.forEach((doc)=> {
            this.state.data.push(doc.data().payload);
        });
        this.setState({
          data:this.state.data
        })
    });
     this.makeRemoteRequest(this.props.navigation.state.params.threadId);
 }
 makeRemoteRequest=(threadId)=>{
   db.collection(`threads`).doc(threadId).collection(`messages`).get()
   .then((querySnapshot)=>{
        console.log('out side of for each',querySnapshot);
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            console.log('in make remote 2',doc.id, " => ", doc.data());
            this.state.data.push(doc.data().payload);
        });
    })
    .then((res)=>{
          this.setState({data:this.state.data})
      })
    .catch((error)=>{
        console.log('error in chating page 2',error)
   })
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
handleRefresh=()=>{
  this.setState({
    page:1,
    refreshing:true,
    seed:this.state.seed+1
  },()=>{
    this.makeRemoteRequest();
  })
}
handleEndReach1=()=>{
  this.setState({
    page:this.state.page+1
  },
  ()=>{
    this.makeRemoteRequest();
  }
)
}
componentWillUnmount(){
    unsubscribe();
}
handleSendMessage=()=>{
  db.collection('threads').doc(this.state.threadId).collection('messages').add({
                                            createdAt:new Date().getTime(),
                                            payload:this.state.text,
                                            senderId:this.state.userId,
  })
  .then((docRef)=>{
    console.log('success in send method',docRef)

  }).catch((error)=>{
    console.log('error in send method ',error)
  })
}

  render() {
    return (
      <View
      style={{flex:1}}
      >
        <View style={{flex:8}}>
            { this.state.data.map((Val,key)=>{
              console.log('in map ',Val)
              return(
                <View style={{flex:2,backgroundColor:'blue',borderRadius:12}}>
                        <Text style={{flex:1,fontSize:18}}>{Val} </Text>
                </View>
              )

            })}
             </View>
             <TextInput
                style={{flex:1}}
                placeholder="type message"
                onChangeText={(text) => this.setState({text})}
              />
              <TouchableOpacity style={{flex:1,backgroundColor:`#7f7f7f`}} onPress={()=>this.handleSendMessage()}>
                      <Text style={{flex:1}}>send  </Text>
                </TouchableOpacity>

       {/* <FlatList
       data={this.state.data}
       renderItem={({ item }) => (
        <View>
           <TouchableOpacity>
              <Text>{item} </Text>
             </TouchableOpacity>
          </View>
        )}
         keyExtractor={(item)=>item.email}
         ItemSeparatorComponent={this.renderSeparator}
        //  ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
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
  }

});