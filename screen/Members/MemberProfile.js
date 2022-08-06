import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Info from './Tabs/Info';
import History from './Tabs/History';


const MemberProfile = () => {

    const Tab = createMaterialTopTabNavigator();

    return ( 
        <Tab.Navigator initialRouteName='Info'>
            <Tab.Screen name='Info' component={Info} />
            <Tab.Screen name='History' component={History} />
        </Tab.Navigator>
     );
}
 
const styles = StyleSheet.create({
    
})
export default MemberProfile;