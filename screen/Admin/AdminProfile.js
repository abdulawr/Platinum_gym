import {
 View,
 Text
} from 'react-native';
import AdminDetails from './BottomSheet/AdminDetails';
import AdminHistory from './BottomSheet/AdminHistory';
import PendingPayment from './BottomSheet/PendingPayment';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from '../../constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminProfile = (props) => {

    const item = props.route.params.item;

    const Tab = createMaterialBottomTabNavigator();

    return (
       <Tab.Navigator initialRouteName='AdminDetail'
        barStyle={{ backgroundColor: Colors.Logo_yellow}} 
        activeColor="#000000"
        inactiveColor="#707070"
       >
         <Tab.Screen name='AdminDetail' 
         options={{
            title:"Details",
            tabBarColor:'red',
            tabBarIcon: (ob) => (
                <MaterialCommunityIcons name='account-details-outline' color={ob.color} size={26} />
                )
         }}
         initialParams={item}
          component={AdminDetails} />

         <Tab.Screen name='PendingPayment'  options={{
            title:"Pending",
            tabBarIcon: (ob) => (
                <MaterialCommunityIcons name='account-eye-outline' color={ob.color} size={26} />
                )
         }}  initialParams={item} component={PendingPayment} />

         <Tab.Screen 
          options={{
            title:"History",
            tabBarIcon: (ob) => (
                <MaterialCommunityIcons name='history' color={ob.color} size={26} />
                )
         }}
         name='AdminHistory'  initialParams={item} component={AdminHistory} />

       </Tab.Navigator>
    );
}
 
export default AdminProfile;