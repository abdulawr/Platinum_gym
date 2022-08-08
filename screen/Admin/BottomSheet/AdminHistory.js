import { useState,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid
   } from 'react-native';
import { doc,increment,updateDoc,where,getDocs, query,collection } from "firebase/firestore"; 
import { fireStore } from '../../../config/firebase';
import Loading from '../../../component/Modal/Loading';
import { FlashList } from '@shopify/flash-list';
import TransactionRow from './TransactionRow';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminHistory = (props) => {

    const item = props.route.params;
    const {navigation} = props;

    const [pendingData,setPendingData] = useState([]);
    const [pendingDataLenght,setPendingDataLenght] = useState(20);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadData();
        });
    
        return unsubscribe;
      }, [navigation]);


      const loadData = async () => {
            setLoading(true);

            const ref = query(collection(doc(collection(fireStore,'adminTransaction'),item.id),'transaction'),where("status","==",1));
            const querySnapshot = await getDocs(ref);
           
            let result = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let itm = doc.data();
            itm.id = doc.id;
            result.push(itm);
            //  console.log(doc.id, " => ", doc.data());
            });

            if(result.length > 0){
                setPendingData(result);
                setPendingDataLenght(result.length);
                setLoading(false);
            }
            else{
                setLoading(false);
            }
      }


       return (
           <SafeAreaView style={styles.container}>
              <Loading visible={loading} />
              <FlashList 
               style={{flex:1}}
                data={pendingData}
                estimatedItemSize={pendingDataLenght}
                renderItem={({item}) => {
                   return <TransactionRow check={false} item={item} />
                }}
              />
           </SafeAreaView>
       );
   }

    const styles = StyleSheet.create({
        container:{
          flex:1,
          paddingTop:10,
          backgroundColor:'white'
        }
    });

   export default AdminHistory;