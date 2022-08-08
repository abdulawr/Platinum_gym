import { useState,useEffect } from 'react';
import{
 Text,
 View,
 StyleSheet
} from 'react-native';
import { fireStore } from '../../../config/firebase';
import { getDoc,doc,collection} from 'firebase/firestore';
import Loading from '../../../component/Modal/Loading';

const CompanyAccount = ({navigation}) => {

    const[balance,setBalance] = useState(0);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadData();
        });
    
        return unsubscribe;
      }, [navigation]);

      const loadData = async () => {
            setLoading(true);
            const result = await getDoc(doc(fireStore, "companyAccount", "account"));
            if(result.exists()){
                setLoading(false);
                setBalance(result.data().amount);
            }else{
                setLoading(false);
                console.log("===> Done")
                setBalance(0);
            }
      }

    return (
        <View style={styles.container}>
            <Loading visible={loading} />
            <Text style={styles.title}>Balance: {balance} PKR</Text>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    title:{
       fontFamily:'MON_BOLD',
       fontSize:17,
       textAlign:'center',
       marginVertical:10
    }
});
export default CompanyAccount;