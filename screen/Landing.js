import {
 View,
 Text,
 StyleSheet,
 Pressable,
 Keyboard,
 TouchableWithoutFeedback,
 ToastAndroid,
 Modal
} from 'react-native';
import Input from '../component/Input/Input';
import Button_c from "../component/Button/Button_c";
import Circle_Image from '../component/Image/Circle_Image';
import MyContext from '../context/MyContext';
import { useContext, useEffect, useState } from 'react';
import Helper from '../Helper/Helper';
import Loading from '../component/Modal/Loading';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import { fireStore,auth } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 


const Landing = (props) => {

   const value = useContext(MyContext);
   const [loading,setLoading] = useState(false);
   const [email,setEmail] = useState();
   const [password,setPassword] = useState();
   const {navigation} = props;

   const [modelVisiable,setModelVisable] = useState(false);
   const [forgotPassword,setforgotPassword] = useState();

   const forgotPasswordFunc = () => {
      if(Helper.validInput(forgotPassword) && Helper.validateEmail(forgotPassword)){
         setLoading(true);
         const auth = getAuth();
         sendPasswordResetEmail(auth, forgotPassword)
           .then(() => {
             setLoading(false);
             setforgotPassword('');
             ToastAndroid.show('Email has been sent to you.',ToastAndroid.SHORT);
           })
           .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             setLoading(false);
             console.log("Error: "+errorMessage);
           });
       }
       else{
         ToastAndroid.show('Invalid email address',ToastAndroid.SHORT);
       }
   }

   const loginUser = () => {
     if(Helper.validInput(email) && Helper.validInput(password)){
        setLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

            var exp_date = new Date(new Date().getTime() + parseInt(user.stsTokenManager.expirationTime) * 1000)

            const docRef = doc(fireStore, "admins", user.uid);
            getDoc(docRef).then((resp)=>{

             let json = resp.data();
             json.userID = user.uid;
             json.tokenID = user.stsTokenManager.accessToken;
             json.expireDate = exp_date;
             
             value.autoLogout(parseInt(user.stsTokenManager.expirationTime) * 1000,navigation);
             
              value.login({...value,user:json});
              json = JSON.stringify(json);
              AsyncStorage.setItem('user',json);
              navigation.replace("HomeScreen");

             }).catch((er)=>{
                setLoading(false);
                console.log(er)
                ToastAndroid.show("Data not loaded try again later",ToastAndroid.SHORT);
             });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            ToastAndroid.show("Invalid email or password!",ToastAndroid.SHORT);
        });

     }
     else{
        ToastAndroid.show("Fill the form correctly",ToastAndroid.SHORT);
     }  
   } 

    return ( 
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <View style={styles.container}>

               <Modal
                  visible={modelVisiable}
                  transparent
               >
                  <View style={styles.modelContainer}>
                        <View style={styles.modeSubContainer}>
                           <Ionicons onPress={() => {setModelVisable(false)} } style={{alignSelf:'flex-end',paddingTop:5,paddingRight:5}} name="close" size={30} color="red" />
                           <Text style={{paddingLeft:15,fontFamily:'MON_REG',fontWeight:'bold'}}>Enter email address</Text>
                           <Input
                              keyboardType='email-address'
                              onChangeText={(text)=>{setforgotPassword(text)}}
                              value={forgotPassword}
                              styles={{width:'90%',alignSelf:'center'}}
                              placeholder="Email..." />

                              <Button_c type="y" onClick={forgotPasswordFunc} title="Submit" style={{alignSelf:'center',marginTop:20}} />
                        </View>
                  </View>
               </Modal>


             <Loading visible={loading} />
            <View>
                 <Circle_Image width={120} uri={require("../assets/images/logo.png")} />
                 <Text style={styles.title}>Platinum Gym</Text>
            </View>

            <Input
               styles={{width:'86%'}}
               placeholder="Email"
               onChangeText={(val) => setEmail(val)}
             />

            <Input
               styles={{width:'86%',marginTop:15}}
               placeholder="Password"
               onChangeText={(val) => setPassword(val)}
               secureTextEntry={true}
             />

             <Pressable onPress={() => {setModelVisable(true);}} style={{alignSelf:'flex-end',marginTop:10,marginRight:21}}>
               <Text style={{fontFamily:'MON_MED',color:'#1D7CF2'}}>
                  Forgot password
               </Text>
             </Pressable>

             <Button_c  onClick={loginUser} title="Login" type="y" style={{marginTop:40,width:'86%'}} />
             </View>
        </TouchableWithoutFeedback>
     );
}
 
const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white'
 },
 title:{fontFamily:'MON_BOLD',alignSelf:'center',marginTop:10,fontSize:18},
 bottom:{
    height:400,
    width:'100%',
    position:'absolute',
    bottom:0,
    zIndex:-1
 },
 botttomImg:{
    width:'100%',
    height:'100%'
 },
 modelContainer:{
   flex:1,
   backgroundColor:'#00000099',
   justifyContent:'center',
   alignItems:'center'
 },
 modeSubContainer:{
   width:'80%',
   height:230,
   backgroundColor:'white',
   borderRadius:10,
   elevation:5
 }
});

export default Landing;