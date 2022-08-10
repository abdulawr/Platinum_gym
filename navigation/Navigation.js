import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProfile from '../screen/Admin/AdminProfile';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import Landing from '../screen/Landing';
import MemberProfile from '../screen/Members/MemberProfile';
import Startup from "../screen/Startup";

const Navigation = () => {

    const Stack = createNativeStackNavigator();

    return ( 
        <NavigationContainer>
           <Stack.Navigator initialRouteName="Startup" screenOptions={{headerShown:false}}>
             <Stack.Screen name="Startup" component={Startup}/>
             <Stack.Screen name="Landing" component={Landing}/>
             <Stack.Screen name="HomeScreen" component={HomeScreen} />
             <Stack.Screen name="MemberProfile" component={MemberProfile} />
             <Stack.Screen name="AdminProfile" component={AdminProfile} />
           </Stack.Navigator>
        </NavigationContainer>
     );
}
 
export default Navigation;