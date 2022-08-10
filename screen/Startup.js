import { useEffect, useState } from 'react';
import {
 View,
 Text,
 ActivityIndicator,
 Button
} from 'react-native';
import Colors from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../context/MyContext';
import { useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

const Startup = (props) => {

    const {navigation} = props;
    const value = useContext(MyContext);
    const [network,setNetwork] = useState(true);

    useEffect(()=>{
        NetInfo.fetch().then(state => {
            if(state.isConnected){
              loadData();
            }
            else{
                setNetwork(false);
                alert("Check your internet connection");
            }

        }); 
    },[])

    const loadData = () => {
        AsyncStorage.getItem('user').then((res) => {
            if(res == null){
               navigation.replace("Landing");
            }else{
                value.login({...value,user:JSON.parse(res)})
                navigation.replace("HomeScreen");
            }
        })
    }

    return ( 
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

           {network != false &&
           <ActivityIndicator color={Colors.Logo_black} size="large"/>
           }
          
          {(network == false) &&
           <Button onPress={loadData} title="Retry"></Button>
          }
       </View>
     );
}


export default Startup;