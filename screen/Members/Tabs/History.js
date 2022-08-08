import { useContext, useState,useEffect } from 'react';
import{
    View,
    Text,
    StyleSheet
} from 'react-native';
import Loading from '../../../component/Modal/Loading';
import MyContext from '../../../context/MyContext';
import { doc,addDoc,updateDoc,increment,getDocs, setDoc,collection } from "firebase/firestore"; 
import { fireStore } from '../../../config/firebase';
import { FlashList } from '@shopify/flash-list';
import HistoryRow from '../HistoryRow';


const History = (props) => {

  const { navigation } = props;
  const item = props.route.params;
  const admin = useContext(MyContext).user;

  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(false);
  const [historySize,setHistorySize] = useState(15);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadData();
        });
    
        return unsubscribe;
      }, [navigation]);

      const loadData = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(doc(collection(fireStore,'memberFee'),item.mobile),'fee'));
            let result = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data());
            //  console.log(doc.id, " => ", doc.data());
            });

            if(result.length > 0){
                setHistory(result);
                setHistorySize(result.length);
                setLoading(false);
            }
            else{
                setLoading(false);
            }
      }

    return ( 
        <View style={{flex:1,backgroundColor:'white'}}>
            <Loading visible={loading} />
           <FlashList 
             data={history}
             estimatedItemSize={historySize}
             renderItem={({item}) =>{
               return <HistoryRow item={item} />
             }}
           />
        </View>
     );
}
 
export default History;