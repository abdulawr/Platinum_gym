import { useEffect } from 'react';
import {
 View,
 Text,
 ActivityIndicator
} from 'react-native';
import Colors from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../context/MyContext';
import { useContext } from 'react';

const Startup = (props) => {

    const {navigation} = props;
    const value = useContext(MyContext);

    AsyncStorage.getItem('user').then((res) => {
        if(res == null){
           navigation.replace("Landing");
        }else{
            value.login({...value,user:JSON.parse(res)})
            navigation.replace("HomeScreen");
        }
    })

    return ( 
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <ActivityIndicator color={Colors.Logo_black} size="large"/>
       </View>
     );
}


export default Startup;