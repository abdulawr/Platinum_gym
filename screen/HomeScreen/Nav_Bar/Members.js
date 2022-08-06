import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl,
    ToastAndroid,
} from 'react-native';
import Loading from '../../../component/Modal/Loading';
import { fireStore } from '../../../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { FlashList } from '@shopify/flash-list';
import Colors from '../../../constant/Colors';
import MemberRow from '../../Members/MemberRow';


const Members = ({ navigation }) => {

    const[members,setMembers] = useState([]);
    const[mLenght,setmLength] = useState(20);
    const[loading,setLoading] = useState(false);
    const[refershing,setRefreshing] = useState(false);

    const openProfile = (item) => {
       navigation.navigate("MemberProfile",{item,item});
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadData();
        });
    
        return unsubscribe;
      }, [navigation]);

    const loadData = async () => {
        const q = collection(fireStore, "members");
        setLoading(true);
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });

        if(result.length > 0){
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

    return ( 
        <View style={styles.container}>
            <Loading visible={loading} />
           
           <FlashList
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
   }
});
export default Members;