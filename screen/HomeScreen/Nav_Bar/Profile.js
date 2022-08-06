import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ToastAndroid
} from 'react-native';
import Input from '../../../component/Input/Input';
import Colors from '../../../constant/Colors';
import { useContext, useState } from 'react';
import MyContext from '../../../context/MyContext';
import Button_c from '../../../component/Button/Button_c';
import Circle_Image from '../../../component/Image/Circle_Image';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Helper from '../../../Helper/Helper';
import { fireStore,auth } from '../../../config/firebase';
import { doc, getDoc,updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../component/Modal/Loading';


const Profile = () => {

    const value = useContext(MyContext);
    const user = value.user;

   // console.log(user);

    const [name,setName] = useState(user.name);
    const [loading,setLoading] = useState(false);
    const [mobile,setMobile] = useState(user.mobile);
    
    const saveProfile = () => {
      if(Helper.validInput(name) && Helper.validInput(mobile)){
        if(name == user.name && mobile == user.mobile){
            ToastAndroid.show("Nothing to change!",ToastAndroid.SHORT);
        }
        else{
            // update values here
            setLoading(true);
            const docRef = doc(fireStore, "admins", user.userID);
            updateDoc(docRef, {
                name: name,
                mobile: mobile,
             }).then((result)=>{

                user.name = name;
                user.mobile = mobile;
                let json = JSON.stringify(user);
                AsyncStorage.setItem('user',json).then((data) => {
                    value.login({...value,user:json});
                    setLoading(false);
                    ToastAndroid.show("Profile updated successfully!",ToastAndroid.SHORT);
                }).catch((error)=>{
                    setLoading(false);
                    ToastAndroid.show("Something went wrong try again",ToastAndroid.SHORT);
                })

             }).catch((error)=>{
                console.log("Error ",error)
                setLoading(false);
                ToastAndroid.show("Failed to update profile",ToastAndroid.SHORT);
             })
        }
      }
      else{
        ToastAndroid.show("Fill the inputs correctly",ToastAndroid.SHORT);
      }
    }

    return ( 
        <ScrollView style={{flex:1,flexGrow:1}} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
         <Loading visible={loading} />

        < TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} style={styles.dataCard}>
          <View style={styles.dataCard}>

         <View style={{marginTop:15,alignItems:'center'}}>
          <Circle_Image width={120} uri={(value.user.image == "null") ? require("../../../assets/images/no_image.jpg") : {uri:value.user.image}} />
           
           {/* <View style={{backgroundColor:'white',height:40,width:40,padding:5,justifyContent:'center',alignItems:'center',borderRadius:20,marginTop:-25}}>
              <FontAwesome5 name="images" size={25} color="black" />
           </View> */}

          <View style={{backgroundColor:'white',padding:8,elevation:5,borderRadius:5,marginTop:10}}>
          <Text style={{fontFamily:'MON_BOLD',marginTop:5}}>
             Email   <Text style={{fontFamily:'MON_REG'}}>{user.email}</Text>
          </Text>

          <Text style={{fontFamily:'MON_BOLD',marginTop:5}}>
             Type   <Text style={{fontFamily:'MON_REG'}}>{(user.type == '1') ? 'Super admin':'Sub admin'}</Text>
          </Text>

          <Text style={{fontFamily:'MON_BOLD',marginTop:5}}>
             Pending balance   <Text style={{fontFamily:'MON_REG'}}>{user.balance}</Text>
          </Text>
          </View>

          </View>

              <Input onChangeText={(val)=>{setName(val)}} value={name} styles={{marginTop:15}} />
              <Input onChangeText={(val)=>{setMobile(val)}} value={mobile} styles={{marginTop:15}} />
              {/* <Input onChangeText={(val)=>{setPassword(val)}} secureTextEntry={true} value={password} styles={{marginTop:15}} /> */}
 
              <Button_c onClick={saveProfile} type='b' title="Update" style={{marginTop:20}} />

          </View>
          </TouchableWithoutFeedback>

             
           <Text style={styles.stitle}>
               Platinum GYM
           </Text>
           <Text style={[styles.stitle,{left:260}]}>
               Platinum GYM
           </Text>

           <View style={styles.top}></View>
           <View style={[styles.top,{width:'60%',opacity:0.4}]}></View>
           <View style={[styles.top,{width:'70%',opacity:0.3}]}></View>
           <View style={[styles.top,{width:'80%',opacity:0.2}]}></View>
           
           <View style={styles.bottom}></View>
           <View style={styles.bottom1}></View>
           <View style={styles.bottom2}></View>

        </View>
        </ScrollView>
     );
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    bottom:{
        width:'50%',
        height:300,
        backgroundColor:Colors.Logo_yellow,
        position:'absolute',
        bottom:0,
        borderTopRightRadius:200,
        borderTopLeftRadius:100,
        borderBottomRightRadius:200,
        opacity:0.6,
        zIndex:100
    },
    bottom1:{
        width:'60%',
        height:300,
        backgroundColor:Colors.Logo_yellow,
        position:'absolute',
        bottom:0,
        borderTopRightRadius:200,
        borderTopLeftRadius:100,
        borderBottomRightRadius:200,
        opacity:0.4
    },
    bottom2:{
        width:'70%',
        height:300,
        backgroundColor:Colors.Logo_yellow,
        position:'absolute',
        bottom:0,
        borderTopRightRadius:200,
        borderTopLeftRadius:100,
        borderBottomRightRadius:200,
        opacity:0.3
    },
    top:{
        width:'50%',
        height:290,
        backgroundColor:Colors.Logo_yellow,
        position:'absolute',
        top:10,
        right:0,
        borderBottomLeftRadius:200,
        borderTopRightRadius:100,
        borderTopLeftRadius:200,
        opacity:0.6
    },
    dataCard:{
       flex:1,
       backgroundColor:'#ffffff99',
       height:'100%',
       zIndex:2000,
        alignItems:'center'
    },
    stitle:{
        zIndex:300,
        fontFamily:'MON_BOLD',
        position:'absolute',
        width:'100%',
        height:'100%',
        textAlign:'center',
        left:110,
        height:'100%',
        fontSize:50,
        transform:[{translateX:50},{rotate:'-90deg'}],
        opacity:0.1
    }
})
export default Profile;