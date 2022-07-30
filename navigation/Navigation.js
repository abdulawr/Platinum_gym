import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screen/Landing';
import Startup from "../screen/Startup";

const Navigation = () => {

    const Stack = createNativeStackNavigator();

    return ( 
        <NavigationContainer>
           <Stack.Navigator initialRouteName="Startup">
             <Stack.Screen name="Startup" component={Startup} options={{headerShown:false}} />
             <Stack.Screen name="Landing" component={Landing} options={{headerShown:false}} />
           </Stack.Navigator>
        </NavigationContainer>
     );
}
 
export default Navigation;