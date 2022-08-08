import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Info from './Tabs/Info';
import History from './Tabs/History';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constant/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const MemberProfile = (props) => {

    const item = props.route.params.item;

    const Tab = createMaterialTopTabNavigator();

    return ( 
        <SafeAreaView style={{flex:1}}>
         <StatusBar backgroundColor={Colors.Logo_yellow} />
        <Tab.Navigator initialRouteName='Info'
        screenOptions={{
            tabBarLabelStyle: { fontFamily:'MON_MED' },
            tabBarStyle: { backgroundColor: Colors.Logo_yellow },
            tabBarIndicatorStyle:{backgroundColor:Colors.Logo_black},
            tabBarShowLabel:false

          }}  >
            <Tab.Screen
             options={{
                    tabBarIcon:(item) => {
                      return <MaterialCommunityIcons name="information-outline" size={24} color={item.color} />;
                    }
                }}
             initialParams={item}
             name='Info' component={Info} />

            <Tab.Screen  options={{
                    tabBarIcon:(item) => {
                      return <MaterialCommunityIcons name="bank-transfer" size={24} color={item.color} />;
                    }
                }} 
                initialParams={item}
                name='History' component={History} />

        </Tab.Navigator>
        </SafeAreaView>
     );
}
 
const styles = StyleSheet.create({
    
})
export default MemberProfile;