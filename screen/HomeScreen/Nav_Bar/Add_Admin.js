import { useState,useLayoutEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Pressable,
    ToastAndroid,
    ScrollView,
    Modal,
    Dimensions
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
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { getStorage, ref,uploadBytes,getDownloadURL,uploadBytesResumable  } from "firebase/storage";
import { Ionicons } from '@expo/vector-icons'; 
import { Camera, CameraType } from 'expo-camera';
import { async } from '@firebase/util';

const Add_Admin = (props) => {

    const {navigation} = props;
    
    const [visible, setVisible] = useState(false);
    let camera = useRef();

    const [name,setName] = useState();
    const [mobile,setMobile] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [loading,setLoading] = useState(false);
    const [chooseimage11,setChooseImage] = useState(null);
    const [image,setImage] = useState(require("../../../assets/images/choose_image.png"));

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [chooseCamera, setchooseCamer] = useState(false);

    const submitForm = async (props) => {
      
        if(Helper.validInput(name) && Helper.validInput(mobile) && Helper.validInput(email) && Helper.validInput(password)){
            
          if(Helper.validateEmail(email)){
         
            if(chooseimage11 != null){

              setLoading(true);
              const storage = getStorage();
              const storageRef = ref(storage,'admins/'+mobile+"/"+Math.random().toString(30)); 
              let response = await fetch(chooseimage11.uri);
              let blog = await response.blob();
              const result1111 = uploadBytesResumable(storageRef, blog);
             
              result1111.on('state_changed',
                (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                  console.log(progress)
                }, 
                (error) => {
                  switch (error.code) {
                    case 'storage/unauthorized':
                      ToastAndroid.show("Image uploading stop due to unauthorized access.",ToastAndroid.SHORT);
                      setLoading(false);
                      break;
                    case 'storage/canceled':
                      ToastAndroid.show("Image uploading canceled.",ToastAndroid.SHORT);
                      setLoading(false);
                      break;
                    case 'storage/unknown':
                      ToastAndroid.show("Something went wrong try again.",ToastAndroid.SHORT);
                      setLoading(false);
                      break;
                  }
                }, 
                (sn) => {
                  // Upload completed successfully, now we can get the download URL
                  getDownloadURL(result1111.snapshot.ref).then((downloadURL) => {
                      
                      // ###############################################
                          const auth = getAuth();
                          createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Store use information in the firebase realtime database START****
                  
                                try {
                                  setDoc(doc(fireStore, "admins", userCredential.user.uid),{
                                    name: name,
                                    status:0,
                                    email: email,
                                    mobile: mobile,
                                    image:downloadURL,
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

                  });
                }
              );
            }
            else{
              setLoading(false);
              ToastAndroid.show('Please select image',ToastAndroid.SHORT);
            }

      }
          else{
            ToastAndroid.show("Please enter valid email address.",ToastAndroid.SHORT);
          }
            
        }
        else{
            ToastAndroid.show("Fill the form correctly.",ToastAndroid.SHORT);
        }
    }

    useLayoutEffect(() => {
      (async () => {
        await askPer();
      })();
    }, [])

    const askPer = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setName('');
          setMobile('');
          setEmail('');
          setPassword('');
          setImage(require("../../../assets/images/choose_image.png"));
        });
    
        return unsubscribe;
     }, [navigation]);

    const chooseImage = async (type) => {

      if(type == 1){
        // chose from gallery
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 0.7,
        });

      //  console.log('Orginal result => ',result);

        if (!result.cancelled) {

          const manipResult = await manipulateAsync(result.uri,
            [],
            { compress: 0.8, format: SaveFormat.JPEG }
          );

       //   console.log('Resize IMage ===> ',manipResult);
          setChooseImage(manipResult);
          setImage({uri:result.uri});
          setchooseCamer(false);
          setVisible(false);
         }
      }
      else{
        // choose from camera
        console.log("choose from camera");
      }
        
    }

    const onCaptureImage = async () => {
      if(camera){
        camera.takePictureAsync().then(async(res)=>{
        
         const manipResult = await manipulateAsync(res.uri,
            [],
            { compress: 0.8, format: SaveFormat.JPEG }
          );

          setChooseImage(manipResult);
          setImage({uri:res.uri});
          setchooseCamer(false);
          setVisible(false);

        })
      }
    }

    return ( 
        <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>

          
            <Modal transparent visible={visible}>
              <View style={{flex:1,backgroundColor:'#00000099',justifyContent:'center',alignItems:'center'}}>
                   <View style={{width:250,height:180,backgroundColor:'white',borderRadius:10,elevation:7,justifyContent:'center'}}>
                      <Ionicons onPress={()=>setVisible(false)} name="close-circle" size={35} color="red" style={{alignSelf:'flex-end'}} />
                      <Button_c onClick={()=> chooseImage(1)} title="Gallery" type='y'  style={{marginTop:0}}/>
                      <Button_c onClick={()=> {
                        if(hasPermission === true ){
                          setchooseCamer(true);
                        }
                        else{
                          askPer(hasPermission);
                        }
                      }} title="Camera" style={{marginTop:15,marginBottom:25}} type='y' />
                   </View>
              </View>
            </Modal>


            <Modal transparent visible={chooseCamera}>
              <View style={{flex:1,backgroundColor:'#00000099',justifyContent:'center',alignItems:'center'}}>
                   <View style={{width:Dimensions.get('window').width-23,height:Dimensions.get('window').height*0.8,backgroundColor:'white',borderRadius:10,elevation:7}}>
                      <Ionicons onPress={()=>setchooseCamer(false)} name="close-circle" size={35} color="red" style={{alignSelf:'flex-end'}} />
                        <Camera
                          autoFocus={true}
                          ratio={[1,1]}
                          ref={(r) => {
                            camera = r
                          }}
                          style={{flex:1,justifyContent:'flex-end'}} type={type}>
                           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingBottom:20}}>
                              <Ionicons onPress={()=>setchooseCamer(false)} name="close-circle" size={70} color="white" style={{alignSelf:'flex-end'}} />
                              <Ionicons onPress={()=>{
                                if(type == 'front'){
                                  setType(CameraType.back);
                                }
                                else{
                                  setType(CameraType.front);
                                }
                              }} name="md-camera-reverse" size={60} color="white" style={{alignSelf:'flex-end'}} />
                              <Ionicons onPress={onCaptureImage} name="checkmark-circle-sharp" size={70} color="white" style={{alignSelf:'flex-end'}} />
                           </View>
                        </Camera>
                   </View>
              </View>
            </Modal>
  

            <Loading visible={loading} />
             <Input value={name} onChangeText={(value) => {setName(value)}} placeholder="Name" />
             <Input value={mobile} onChangeText={(value) => {setMobile(value)}} placeholder="Mobile" />
             <Input value={email} onChangeText={(value) => {setEmail(value)}} placeholder="E-mail" />
             <Input value={password} secureTextEntry={true} onChangeText={(value) => {setPassword(value)}} placeholder="Password" />

             <Pressable onPress={()=>setVisible(true)} style={styles.imageContainer}>
               <Image resizeMode="contain" style={styles.image}  source={image}  />
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