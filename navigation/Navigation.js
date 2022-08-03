import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import Landing from '../screen/Landing';
import Startup from "../screen/Startup";


const Navigation = () => {

    const Stack = createNativeStackNavigator();

    return ( 
        <NavigationContainer>
           <Stack.Navigator initialRouteName="Startup" screenOptions={{headerShown:false}}>
             <Stack.Screen name="Startup" component={Startup}/>
             <Stack.Screen name="Landing" component={Landing}/>
             <Stack.Screen name="HomeScreen" component={HomeScreen} />
           </Stack.Navigator>
        </NavigationContainer>
     );
}
 
export default Navigation;