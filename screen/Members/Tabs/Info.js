import { useContext, useEffect, useState } from 'react';
import{
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions,
    Modal,
    ToastAndroid
} from 'react-native';
import Colors from '../../../constant/Colors';
import MyContext from '../../../context/MyContext';
import Button_c from '../../../component/Button/Button_c';
import Loading from '../../../component/Modal/Loading';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Input_b from '../../../component/Input/Input_b';
import QRCode from 'react-native-qrcode-svg';
import { doc,addDoc,updateDoc,increment, setDoc,collection } from "firebase/firestore"; 
import { fireStore } from '../../../config/firebase';
import Helper from '../../../Helper/Helper';


const Info = (props) => {

    const item = props.route.params;
    const admin = useContext(MyContext).user;
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);

    const [amount,setAmount] = useState();
    const [des,setDes] = useState();

    const date =  new Date(item.join_date.seconds * 1000).toDateString()


    const addFee = () => {

        if(Helper.validInput(amount)){
          setLoading(true);
          addDoc(collection(doc(collection(fireStore,'memberFee'),item.mobile),'fee'),{
            date: new Date(),
            amount: amount,
            des: des || null,
            addedBy:admin.userID,
          }).then((resp) => {

            // update company account amount
            updateDoc(doc(fireStore, "companyAccount", 'account'),{
                amount: increment(amount)
              }).then((resp) => {

                if(admin.type == 2){
                // update admin amount start
                updateDoc(doc(fireStore, "admins",admin.userID),{
                    balance: increment(amount)
                  }).then((resp) => {

                    // status = 0 pending and stautus = 1 approved
                    
                    // add Admintransaction start
                    addDoc(collection(doc(collection(fireStore,'adminTransaction'),admin.userID),'transaction'),{
                      date:new Date(),
                      amount:amount,
                      status:0,
                      des:des || null,
                      addedFor:item.mobile || null,
                      name:item.name || null,
                    }).then((res) => {
                        // for sub admin
                        setLoading(false);
                        setAmount('');
                        setDes('');
                        setModal(false);
                        ToastAndroid.show('Transaction added successfully!',ToastAndroid.SHORT);

                    }).catch((error) => {
                        setLoading(false);
                        ToastAndroid.show('Error occured while adding admin transaction!',ToastAndroid.SHORT);
                    })
                    //add admin transaction end

                  }).catch((exp)=>{
                    setLoading(false);
                    ToastAndroid.show('Error occured while updating admin balance!',ToastAndroid.SHORT);
                  });
                  // update admin amount
                }
                else{
                    // for super admin
                    setLoading(false);
                    setAmount('');
                    setDes('');
                    setModal(false);
                    ToastAndroid.show('Transaction added successfully!',ToastAndroid.SHORT);
                }

              }).catch((exp)=>{
                setLoading(false);
                ToastAndroid.show('Error occured while updating company account!',ToastAndroid.SHORT);
              });

          }).catch((exp)=>{
            setLoading(false);
            ToastAndroid.show('Error occured try again',ToastAndroid.SHORT);
          });
          

        }
        else{
            ToastAndroid.show('Please enter amount first',ToastAndroid.SHORT);
        }
    }


    return ( 
        <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}>
            <View style={styles.container}>

                <Loading visible={loading} />

                <Modal
                 transparent
                 visible={modal}
                >
                    <View style={styles.modalTop}>
                        <View style={styles.modalContainer}>
                           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                           <Text style={{fontFamily:'MON_BOLD',fontSize:20,marginLeft:16,paddingTop:10}}>Fee form</Text>
                           <MaterialCommunityIcons onPress={()=>setModal(false)} style={{alignSelf:'flex-end'}} name="close-circle" size={40} color="#E74C3C" />
                           </View>

                          <Input_b
                            onChangeText={(val)=>setAmount(val)}
                            keyboardType="numeric"
                            value={amount}
                            placeholder="Amount"
                            styles={{width:'94%',alignSelf:'center',marginTop:20}} />

                          <Input_b 
                            onChangeText={(val)=>setDes(val)}
                            multiline={true}
                            value={des}
                            placeholder="Description"
                            styles={{width:'94%',alignSelf:'center',height:150,marginTop:15,textAlign:'left',textAlignVertical:'top',paddingVertical:7}} />
                          
                          <Button_c onClick={addFee} type="b" title="Submit" style={{marginVertical:20}} />

                        </View>
                    </View>
                </Modal>

                 <View style={styles.card}>
                     <View style={{marginVertical:30,alignItems:'center'}}>
                        <QRCode
                            size={220}
                           
                            logo={require("../../../assets/images/color_logo.png")}
                            value={item.mobile}
                            />
                        </View>

                    <Image style={styles.image} source={(item.image == null) ? require("../../../assets/images/no_image.jpg") : {uri:item.image}} />
                
                    <View style={{flexDirection:'row',marginTop:15}}>
                        <Text style={styles.lable}>Name</Text>
                        <Text style={styles.pair}>{item.name}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Mobile</Text>
                        <Text style={styles.pair}>{item.mobile}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Secondary</Text>
                        <Text style={styles.pair}>{item.secondaryContact}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>CNIC</Text>
                        <Text style={styles.pair}>{item.cnic}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Occupation</Text>
                        <Text style={styles.pair}>{item.occupation}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Address</Text>
                        <Text style={styles.pair}>{item.address}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Age</Text>
                        <Text style={styles.pair}>{item.age}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Join date</Text>
                        <Text style={styles.pair}>{date}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Weight</Text>
                        <Text style={styles.pair}>{item.weight}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Height</Text>
                        <Text style={styles.pair}>{item.height}</Text>                   
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={styles.lable}>Blood</Text>
                        <Text style={styles.pair}>{item.bloodGroup}</Text>                   
                    </View>


                  <Button_c onClick={()=>setModal(true)} type="oy" title="Add fee" style={{marginTop:20}} />
        
                 </View>

            </View>
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    image:{
        width:110,
        height:110,
        borderRadius:15,
        elevation:6,
        alignSelf:'center',
        marginTop:12
    },
    card:{
        width:Dimensions.get('window').width - 20,
        backgroundColor:'white',
        elevation:7,
        margin:10,
        borderRadius:8,
        paddingBottom:15
    },
    lable:{
        fontFamily:'MON_MED',
        width:'30%',
        paddingLeft:10,
        backgroundColor:'lightblue',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        paddingVertical:2
    },
    pair:{
        width:'70%',
        textAlign:'left',
        fontFamily:'MON_REG',
        paddingRight:10,
        paddingLeft:10
    },
    modalTop:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000099'
    },
    modalContainer:{
        width:'90%',
        backgroundColor:'white',
        borderRadius:5,
        elevation:5,
    }
})
 
export default Info;