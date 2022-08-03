import {
View,
Text,
StyleSheet
} from 'react-native';
import { useContext } from 'react';
import MyContext from '../../context/MyContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './Nav_Bar/About';
import Members from './Nav_Bar/Members';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '../../constant/Colors';
import CustomNavigation from './Nav_Bar/CustomNavigation';
import Add_Member from './Nav_Bar/Add_Member';
import Add_Admin from './Nav_Bar/Add_Admin';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Profile from './Nav_Bar/Profile';
import AdminList from './Nav_Bar/AdminList';


const HomeScreen = () => {

    const value = useContext(MyContext);
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator 
            useLegacyImplementation
            drawerContent={(props) => <CustomNavigation {...props} />}
            initialRouteName='Home'
            screenOptions={
                {
                    drawerActiveTintColor:Colors.Logo_yellow,
                    drawerActiveBackgroundColor:Colors.Logo_black+'99',
                    title:'Platinum GYM',
                    headerTintColor:Colors.Logo_black,
                    headerStyle:{backgroundColor:Colors.Logo_yellow},
                    headerTitleStyle:{fontFamily:"MON_BOLD"},
                }
               }>

            <Drawer.Screen 
            options={{
                    drawerLabel:'Members',
                     drawerIcon:({color,size,focused})=> <Ionicons name={(focused == true) ? 'home' : 'home-outline'} size={size} color={color}></Ionicons>}
                } name='Home' component={Members}  />
 
            <Drawer.Screen 
            options={{
                    drawerLabel:'Add member',
                     drawerIcon:({color,size,focused})=> <Ionicons name={(focused == true) ? 'settings' : 'settings-outline'} size={size} color={color}></Ionicons>}
                } name='Add_Memeber' component={Add_Member}  />

          {
            (value.user.type == '1') &&
            <>
            <Drawer.Screen 
            options={{
                    drawerLabel:'Add admin',
                     drawerIcon:({color,size,focused})=> <FontAwesome5 name={(focused == true) ? 'user-alt' : 'user'} size={size} color={color}></FontAwesome5>}
                } name='Add_Admin' component={Add_Admin}  />

           <Drawer.Screen 
            options={{
                    drawerLabel:'Admin list',
                     drawerIcon:({color,size,focused})=> <FontAwesome5 name={(focused == true) ? 'list-alt' : 'list-alt'} size={size} color={color}></FontAwesome5>}
                } name='AdminList' component={AdminList}  />
           </>
          }

           <Drawer.Screen 
            options={{
                    drawerLabel:'Profile',
                     drawerIcon:({color,size,focused})=> <FontAwesome5 name={(focused == true) ? 'user-circle' : 'user-circle'} size={size} color={color}></FontAwesome5>}
                } name='Profile' component={Profile}  />

            <Drawer.Screen options={{
                    drawerLabel:'About',
                    drawerLabelStyle:{fontFamily:'MON_MED'},
                     drawerIcon:({color,size,focused})=> <Ionicons name={(focused == true) ? 'information-circle' : 'information-circle-outline'} size={size} color={color}></Ionicons>}
            } name='About' component={About}  />
     
        </Drawer.Navigator>
    );
}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default HomeScreen;