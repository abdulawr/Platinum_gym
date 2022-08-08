import {
 View,
 Text,
 StyleSheet,
 ToastAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constant/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Circle_Image from '../../../component/Image/Circle_Image';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import Loading from '../../../component/Modal/Loading';
import { doc,increment,updateDoc,where,getDocs, query,collection, getDoc } from "firebase/firestore"; 
import { fireStore } from '../../../config/firebase';


const AdminDetails = (props) => {

    const item = props.route.params;
    const {navigation} = props;


    const[loading,setLoading] = useState(false);

    const resetPassword = () => {
        const auth = getAuth();
        setLoading(true);
        sendPasswordResetEmail(auth, 'tcomprog@gmail.com')
          .then(() => {
            setLoading(false);
            ToastAndroid.show("Email sent successfully, kindly check inbox or spam!",ToastAndroid.SHORT);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            ToastAndroid.show("Something went wrong try again",ToastAndroid.SHORT);
          });
    }

    const deleteAdmin = () => {
        setLoading(true)
        updateDoc(doc(fireStore, "admins",item.id),{
            status: 1
          }).then((resp) => {

            setLoading(false);
            ToastAndroid.show("Account deleted successfully",ToastAndroid.SHORT);
            navigation.goBack();
             
          }).catch((error) => {
            setLoading(false);
            ToastAndroid.show("Something went wrong try again",ToastAndroid.SHORT);
          })
    }

    return (
        <SafeAreaView style={styles.container}>
               <Loading visible={loading} />
               <View style={styles.card}>
                 <View style={{marginTop:-60,alignSelf:'center'}}>
                  <Circle_Image width={120} uri={(item.image == null || item.image == 'null') ? require('../../../assets/images/logo.png') : {uri:item.image}} />
                  </View>

                   <View style={{marginTop:20}}>
                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>Name</Text>
                         <Text style={styles.desc}>{item.name}</Text>
                     </View>

                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>Email</Text>
                         <Text style={styles.desc}>{item.email}</Text>
                     </View>

                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>Mobile</Text>
                         <Text style={styles.desc}>{item.mobile}</Text>
                     </View>

                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>Balance</Text>
                         <Text style={styles.desc}>{item.balance}</Text>
                     </View>

                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>Type</Text>
                         <Text style={styles.desc}>{(item.type == '1') ? "Super admin" : "Sub admin"}</Text>
                     </View>
                     
                   </View>

                 <View style={{flexDirection:'row',bottom:15,position:'absolute',right:10}}>
                     <MaterialCommunityIcons onPress={resetPassword} name="lock-reset" size={33} color="#707070" />
                     {item.type == "2" &&
                     <MaterialCommunityIcons onPress={deleteAdmin} style={{marginLeft:10}} name="delete" size={33} color="#707070" />
                     }
                     </View>

               </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:70
    },
    card:{
        width:'92%',
        height:380,
        elevation:6,
        backgroundColor:'white',
        borderRadius:5
    },
    title:{
        fontFamily:"MON_BOLD",
        backgroundColor:'#333e13',
        color:'white',
        width:120,
        elevation:3,
        borderRadius:2,
        paddingVertical:3,
        paddingHorizontal:10,
        marginLeft:-35,
        paddingLeft:49,
        marginTop:10
    },
    desc:{
  
        flex:1,
        marginTop:10,
        marginLeft:5,
        paddingVertical:3,
        paddingHorizontal:10,
        fontFamily:'MON_REG',
    }
   
});

export default AdminDetails;