import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    ToastAndroid
} from 'react-native';
import Input_b from '../../../component/Input/Input_b';
import Colors from '../../../constant/Colors';
import { useState } from 'react';
import Button_c from '../../../component/Button/Button_c';
import Loading from '../../../component/Modal/Loading';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import Helper from '../../../Helper/Helper';
import { fireStore } from '../../../config/firebase';
import { doc, setDoc,getDoc  } from "firebase/firestore"; 
import { getStorage, ref,uploadBytes,getDownloadURL,uploadBytesResumable  } from "firebase/storage";


const Add_Member = (props) => {
    const {navigation} = props;
    const [image,setImage] = useState(require("../../../assets/images/choose_image.png"));

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [occupation,setOccupation] = useState('');
    const [age,setAge] = useState('');
    const [cnic,setCnic] = useState('');
    const [address,setAddress] = useState();
    const [mobile,setMobile] = useState('');
    const [secondary_contact,setSecondary_Contact] = useState();
    const [weight,setWeight] = useState('');
    const [height,setHeight] = useState('');
    const [blood_group,setBloodgroup] = useState('');
    const [chooseImage,setChooseImage] = useState(null);

    const addMember = () => {
   
        if(Helper.validInput(name) && Helper.validInput(age) && Helper.validInput(cnic) && Helper.validInput(mobile)){
            setLoading(true);

            try {

                 getDoc(doc(fireStore, "members", mobile)).then((result)=>{

                    if(result.exists()){
                        setLoading(false);
                        ToastAndroid.show("Member with "+mobile+" exist, try with different mobile number",ToastAndroid.SHORT);
                    }
                    else{
                        if(chooseImage == null){
                           insertMemberData(null);
                        }
                        else{
                            (async()=>{
                                const storage = getStorage();
                                const storageRef = ref(storage,'member/'+mobile+"/"+Math.random().toString(30)); 
                                let response = await fetch(chooseImage.uri);
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
                       insertMemberData(downloadURL);
                    });
                    }
                );

                            })();
                        }
                    }

                }).catch((error) => {
                setLoading(false);
                ToastAndroid.show("Something went try again",ToastAndroid.SHORT);
                })
                
            } catch (e) {
                console.log("Error --> ",e);
              setLoading(false);
              ToastAndroid.show('Something went wrong try again',ToastAndroid.SHORT);
            }

        }
        else{
          ToastAndroid.show("Fill the required fields correctly",ToastAndroid.SHORT);
        }
    }


    const insertMemberData = (imagePath) => {
        setDoc(doc(fireStore, "members", mobile),{
            join_date:new Date(),
            name:name,
            occupation:occupation,
            age:age,
            cnic:cnic,
            address:address,
            mobile:mobile,
            secondaryContact:secondary_contact,
            weight:weight,
            height:height,
            bloodGroup:blood_group,
            image:imagePath
         }).then((resp) => {
           setLoading(false);
           ToastAndroid.show('Account created successufully',ToastAndroid.SHORT);

           setName('');
           setMobile('');
           setOccupation('');
           setHeight('');
           setImage(require("../../../assets/images/choose_image.png"));
           setWeight('');
           setAge('');
           setAddress('');
           setSecondary_Contact('');
           setBloodgroup('');
           setChooseImage(null);
           setCnic('');

           setTimeout(() => {
             navigation.navigate("Home");
           }, 100);
         
         }).catch((exp)=>{
           setLoading(false);
           ToastAndroid.show('Error occured while adding user data!',ToastAndroid.SHORT);
         });
    }


    const chooseImageFunc = async () => {
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
      }
    }

     

    return ( 
        <ScrollView  style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <Loading visible={loading} />
            <Text style={{fontFamily:'MON_BOLD',fontSize:23,marginVertical:8,alignSelf:'flex-start',paddingLeft:16}}>Membership Form</Text>

            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Text style={{textAlignVertical:'center',color:'red',marginTop:10,paddingRight:5}}>*</Text>
                <Input_b onChangeText={(val)=>{setName(val)}} value={name} placeholder="Name" styles={{marginTop:12,width:'94%'}} />
            </View>

            <Input_b onChangeText={(val)=>{setOccupation(val)}} value={occupation} placeholder="Occupation" styles={{marginTop:12,width:'94%',marginLeft:10}} />
           
            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Text style={{textAlignVertical:'center',color:'red',marginTop:10,paddingRight:5}}>*</Text>
                <Input_b maxLength={2} keyboardType="number-pad" onChangeText={(val)=>{setAge(val)}} value={age} placeholder="Age" styles={{marginTop:12,width:'94%'}} />
            </View>

            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Text style={{textAlignVertical:'center',color:'red',marginTop:10,paddingRight:5}}>*</Text>
                <Input_b maxLength={13} keyboardType="number-pad" onChangeText={(val)=>{setCnic(val)}} value={cnic} placeholder="CNIC" styles={{marginTop:12,width:'94%'}} />
            </View>

            
            <Input_b onChangeText={(val)=>{setAddress(val)}} value={address} placeholder="Home address" styles={{marginTop:12,width:'94%',height:150,textAlign:'left',textAlignVertical:'top',paddingVertical:8}} multiline={true} />
           
            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Text style={{textAlignVertical:'center',color:'red',marginTop:10,paddingRight:5}}>*</Text>
                <Input_b maxLength={11} keyboardType="number-pad" onChangeText={(val)=>{setMobile(val)}} value={mobile} placeholder="Mobile" styles={{marginTop:12,width:'94%'}} />
            </View>
           
            <Input_b maxLength={11} keyboardType="number-pad" onChangeText={(val)=>{setSecondary_Contact(val)}} value={secondary_contact} placeholder="Secondary contact" styles={{marginTop:12,width:'94%'}} />
            <Input_b  onChangeText={(val)=>{setWeight(val)}} value={weight} placeholder="Weight" styles={{marginTop:12,width:'94%'}} />
            <Input_b  onChangeText={(val)=>{setHeight(val)}} value={height} placeholder="Height" styles={{marginTop:12,width:'94%'}} />
            <Input_b onChangeText={(val)=>{setBloodgroup(val)}} value={blood_group} placeholder="Blood group" styles={{marginTop:12,width:'94%'}} />

            <Pressable onPress={chooseImageFunc} style={styles.imageContainer}>
               <Image resizeMode="contain" style={styles.image}  source={image}  />
            </Pressable>

            <Button_c onClick={addMember} type='y' style={{width:'94%',marginVertical:20}} title="Add member" />

        </View>
        </ScrollView>
     );
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    imageContainer:{
        width:'94%',
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
export default Add_Member;