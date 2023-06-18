import { Input } from "@rneui/themed";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Button, Icon, } from "react-native-elements";
import { FontAwesome5 } from 'react-native-vector-icons';
const SignInScreen = () => {
  return ( 
  <View style={{height:'100%',width:'100%'}}>
    <ScrollView>
<Image source={require('../../../assets/images/leafySignInLogo.png')} style={{height:300,width:'100%'}} resizeMode='stretch'/>
<View style={{flex:1,paddingHorizontal:20,marginTop:20}}>
<View style={{minHeight:70,width:'100%'}}>
<Image source={require('../../../assets/images/leafLogo.png')} style={{height:40,width:'100%',position:'absolute',right:73,bottom:53}} resizeMode='contain'/>


<Text style={{fontSize:24,fontWeight:'bold'}}>Sign in</Text>
<Text style={{fontSize:12,fontWeight:'400',color:'grey'}}>Need to leafy? <Text style={{color:'black',fontWeight:'bold'}}>sign up for free</Text></Text>

</View>
<View style={{}}>
<Input
      placeholder='Email'
      placeholderTextColor={'grey'}
      errorStyle={{ color: 'red' }}
      errorMessage=''
    />
    <Input
      placeholder='Password'
      placeholderTextColor={'grey'}
      errorStyle={{ color: 'red' }}
      errorMessage=''
    />
    <Text style={{fontSize:14,color:'black',fontWeight:'bold',paddingHorizontal:10}}>Forgot password? </Text>
    <View style={{paddingHorizontal:10}}>
    <Button title={'Sign in'} buttonStyle={{backgroundColor:'green',borderRadius:20,marginVertical:10,height:40}}/>
    <Button title={'Sign in with Google'} icon={ <Icon name="google" type="font-awesome-5" size={20} color={'blue'} style={{marginRight:10}} />} buttonStyle={{backgroundColor:'white',borderRadius:20,marginVertical:10,height:40,borderWidth
  :1,borderColor:'black'
  }} titleStyle={{color:'black'}}/>
    </View>
</View>
</View>
</ScrollView>

    </View>
  )
};

export default SignInScreen;
