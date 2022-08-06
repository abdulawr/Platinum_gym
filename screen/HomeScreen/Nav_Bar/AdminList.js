import { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import MyContext from '../../../context/MyContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from '../../../config/firebase';
import { FlashList } from '@shopify/flash-list';
import AdminRow from '../../Admin/AdminRow';
import Loading from '../../../component/Modal/Loading';


const AdminList = ({ navigation }) => {

    const value = useContext(MyContext);
    const [admins,setAdmin] = useState();
    const [length,setLength] = useState(10);
    const [loading,setLoading] = useState(false);
   // console.log("Value => ",value)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            (
                async () => {
                    const q = query(collection(fireStore, "admins"), where("type", "==", '2'));
                    setLoading(true);
                    const querySnapshot = await getDocs(q);
                    let result = [];
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      result.push(doc.data());
                    //  console.log(doc.id, " => ", doc.data());
                    });
    
                    if(result.length > 0){
                        setAdmin(result);
                        setLength(result.length);
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                    }
                }
            )();
        });
    
        return unsubscribe;
      }, [navigation]);

    return ( 
        <View style={styles.container}>
            <Loading visible={loading} />

           <FlashList
           data={admins}
           estimatedItemSize={length}
           renderItem={({item}) =>{
             return <AdminRow item={item} />
           }}
           />
        </View>
     );
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    list:{
        flex:1,
        width:'100%'
    }
})
export default AdminList;