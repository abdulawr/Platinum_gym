import { useEffect } from 'react';
import {
 View,
 Text,
 ActivityIndicator
} from 'react-native';
import Colors from '../constant/Colors';

const Startup = (props) => {

    const {navigation} = props;

    useEffect(()=>{
         navigation.replace("Landing");
    },[]);

    return ( 
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <ActivityIndicator color={Colors.Logo_black} size="large"/>
       </View>
     );
}


export default Startup;