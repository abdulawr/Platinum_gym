import { useEffect, useState,useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl,
    ToastAndroid,
    Keyboard,
    Modal,
    Button
} from 'react-native';
import Loading from '../../../component/Modal/Loading';
import { fireStore } from '../../../config/firebase';
import { collection, query, doc,where,getDoc, getDocs, orderBy,limit } from "firebase/firestore";
import { async } from '@firebase/util';
import { FlashList } from '@shopify/flash-list';
import Colors from '../../../constant/Colors';
import MemberRow from '../../Members/MemberRow';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import { BarCodeScanner } from 'expo-barcode-scanner';
import Helper from '../../../Helper/Helper';


const Members = ({ navigation }) => {

    const[members,setMembers] = useState([]);
    const[search_box,setSearchBox] = useState(false);
    const[mLenght,setmLength] = useState(20);
    const[loading,setLoading] = useState(false);
    const[refershing,setRefreshing] = useState(false);

    const [querystr,setQuery] = useState();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedModel, setScannedModel] = useState(false);

    const openProfile = (item) => {
       navigation.navigate("MemberProfile",{item,item});
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          if(search_box == false)
          return <Ionicons onPress={()=>setSearchBox(true)} style={{marginRight:10}} name="search" size={24} color={Colors.Logo_black} />
          else
          {
            return <Ionicons onPress={()=>setSearchBox(false)} style={{marginRight:10}} name="close" size={24} color={Colors.Logo_black} />
          }
        },
      });

      (
        async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
      )();

    }, [navigation,search_box,hasPermission]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadData();
        });
    
        return unsubscribe;
      }, [navigation]);

      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);

        if(Helper.validInput(data)){
           await searchMember(data);
        }

      };

    const searchMember = async (mobile) => {
       // setLoading(true);
        const q = doc(collection(fireStore, "members"),mobile);
        const querySnapshot = await getDoc(q);
        if(querySnapshot.exists()){
           setLoading(false);
           setScanned(false);
           setScannedModel(false);
           openProfile(querySnapshot.data());
        }else{
         setLoading(false);
         setScannedModel(false);
         ToastAndroid.show("Record not found try again",ToastAndroid.SHORT);
        }
    }

    const loadData = async (src = null) => {
      
       let q = query(collection(fireStore, "members"),orderBy('join_date'),limit(50));

        if(src != null){
          q = query(collection(fireStore, "members"),where('mobile','==',querystr));
        }
      
        setLoading(true);
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });

          if(result.length > 0 || src != null){
            setMembers(result);
            setmLength(result.length);
            setLoading(false);
            setRefreshing(false);
        }
        else{
            setLoading(false);
            setRefreshing(false);
        } 

    }

    let header = null;
    if(search_box == true){
     header = <View><View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(val)=>{
                    setQuery(val);
                  }}

                  keyboardType='numeric'
                  placeholder="Search with mobile no.."
                  />

               <Ionicons
                onPress={()=>{
                   if(Helper.validInput(querystr)){
                     loadData(true);
                   }
                   else{
                    ToastAndroid.show('First enter mobile number',ToastAndroid.SHORT);
                   }
                }}
               style={{marginLeft:5}} name="search-circle-outline" size={40} color={Colors.Logo_black}/>
               <Ionicons  onPress={()=>setScannedModel(true)} name="md-scan-circle-sharp" size={40} color={Colors.Logo_black} />
    
               </View>
               {
                Helper.validInput(querystr) && mLenght <= 0 &&
               <Text style={{fontFamily:'MON_MED',fontSize:17,marginVertical:10,textAlign:'center'}}>No record found</Text>
               }
            </View> 
    }

    return ( 
        <View style={styles.container}>
            <Loading visible={loading} />

          <Modal
            transparent
            visible={scannedModel}
           >
            <View style={styles.modalContainer}>
               <View style={styles.modalView}>
                <Ionicons onPress={()=>setScannedModel(false)} name="close-circle" size={35} color="red" style={{alignSelf:'flex-end'}} />
               <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height:'95%',width:'100%'}}
                  />
                  {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
               </View>
            </View>
           </Modal>
           
      
           <FlashList
            ListHeaderComponent = {header}
            data={members}
            estimatedItemSize={mLenght}
            renderItem = {({item}) => {
                return <MemberRow openProfile={openProfile} item={item} />
            }}

            refreshControl={
                <RefreshControl
                  refreshing={refershing}
                  onRefresh={()=>{
                    setRefreshing(true);
                    loadData();
                  }}
                />
            }

           />

        </View>
     );
}
 
const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'white'
   },
   input:{
    borderWidth:1,
    height:46,
    borderRadius:24,
    borderColor:'#707070',
    paddingHorizontal:10,
    fontFamily:'MON_REG',
    color:Colors.Logo_black,
    flex:1
   },
   searchContainer:{
     marginVertical:12,
     marginHorizontal:10,
     flexDirection:'row',
     alignItems:'center',
   },
   modalContainer:{
    backgroundColor:'#00000099',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   },
   modalView:{
    backgroundColor:'white',
    width:'90%',
    height:'85%',
    borderRadius:10
   }
});
export default Members;