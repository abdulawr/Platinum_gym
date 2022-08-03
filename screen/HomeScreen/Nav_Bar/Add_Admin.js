import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,

    Pressable,
    ToastAndroid,
    ScrollView
} from 'react-native';
import Button_c from '../../../component/Button/Button_c';
import Input from '../../../component/Input/Input';
import Loading from '../../../component/Modal/Loading';
import Colors from '../../../constant/Colors';
import Helper from '../../../Helper/Helper';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireStore } from '../../../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Image  from 'react-native-compressor';


const Add_Admin = (props) => {

    const {navigation} = props;

    const [name,setName] = useState();
    const [mobile,setMobile] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [loading,setLoading] = useState(false);
    const [chooseimage,setChooseImage] = useState(false);
    const [image,setImage] = useState(require("../../../assets/images/choose_image.jpg"));

    const submitForm = (props) => {
      
        if(Helper.validInput(name) && Helper.validInput(mobile) && Helper.validInput(email) && Helper.validInput(password)){
            
          if(Helper.validateEmail(email)){
            setLoading(true);

            // ###############################################
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Store use information in the firebase realtime database START****
     
                   try {
                    setDoc(doc(fireStore, "admins", userCredential.user.uid),{
                       name: name,
                       email: email,
                       mobile: mobile,
                       image:'null',
                       type:'2',
                       balance:'0'
                     }).then((resp) => {
                       setLoading(false);
                       ToastAndroid.show('Account created successufully',ToastAndroid.SHORT);
                       setTimeout(() => {
                         navigation.navigate("AdminList");
                       }, 100);
                     
                     }).catch((exp)=>{
                       setLoading(false);
                       ToastAndroid.show('Error occured while adding user data!',ToastAndroid.SHORT);
                     });
                    
                 } catch (e) {
                    console.log("Error --> ",e);
                   setLoading(false);
                   ToastAndroid.show('Something went wrong try again',ToastAndroid.SHORT);
                 }
     
                   // Store use information in the firebase realtime database END****  
              })
              .catch((error) => {
                console.log(error)
                setLoading(false);
                ToastAndroid.show('Account exist with this email!',ToastAndroid.SHORT);
              });
            // ###############################################

          }
          else{
            ToastAndroid.show("Please enter valid email address.",ToastAndroid.SHORT);
          }
            
        }
        else{
            ToastAndroid.show("Fill the form correctly.",ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
   
        (
            async () => {
                Image.compress('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540tcomprog%252FPlatinum_gym/ImagePicker/62f85c97-210b-4306-91f3-182e1c56384d.jpg', {
                    compressionMethod: 'auto',
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log('Error --> ',err);
                })
               
            }
        )()

        const unsubscribe = navigation.addListener('focus', () => {
          setName('');
          setMobile('');
          setEmail('');
          setPassword('');
        });
    
        return unsubscribe;
     }, [navigation]);

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.7,
          });

          console.log(result);

          if (!result.cancelled) {

            const result11 = await Image.compress(result.uri, {
                quality: 0.8,
                compressionMethod: 'auto',
            });
            console.log(result11);
            setChooseImage(result.uri);
            setImage({uri:result.uri});
          }
    }

    return ( 
        <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <Loading visible={loading} />
             <Input value={name} onChangeText={(value) => {setName(value)}} placeholder="Name" />
             <Input value={mobile} onChangeText={(value) => {setMobile(value)}} placeholder="Mobile" />
             <Input value={email} onChangeText={(value) => {setEmail(value)}} placeholder="E-mail" />
             <Input value={password} secureTextEntry={true} onChangeText={(value) => {setPassword(value)}} placeholder="Password" />

             <Pressable onPress={chooseImage} style={styles.imageContainer}>
               {/* <Image resizeMode="contain" style={styles.image}  source={image}  /> */}
             </Pressable>

             <Button_c onClick={submitForm} style={{width:'86%',marginVertical:40}} title="Submit" type="y" />
        </View>
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container :{
     flex:1,
     backgroundColor:'white',
     alignItems:'center'
    },
    imageContainer:{
        width:'86%',
        height:200,
        borderWidth:1,
        borderColor:Colors.Logo_black,
        marginTop:30,
        borderRadius:10,
        padding:5,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:190,
    }
})
 
export default Add_Admin;