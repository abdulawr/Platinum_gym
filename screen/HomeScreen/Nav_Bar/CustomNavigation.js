import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    createDrawerNavigator
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 
import MyContext from '../../../context/MyContext';
import { useContext } from 'react';
import Circle_Image from '../../../component/Image/Circle_Image';
import Colors from '../../../constant/Colors';


const CustomNavigation = (props) => {

    const {navigation} = props;
    const value = useContext(MyContext);

    const logOut = () => {
      value.logout();
      navigation.replace("Landing");
    }

    return ( 
        <View style={{flex:1}}>

            <View style={styles.header}>
                 <View style={{zIndex:120,position:'absolute',marginLeft:16,marginTop:10,paddingTop:40,flexDirection:'row'}}>
                    <Circle_Image width={70} uri={(value.user.image == "null") ? require("../../../assets/images/no_image.jpg") : {uri:value.user.image}} />
                    <View style={{flex:2,paddingLeft:10,paddingTop:10}}> 
                        <Text style={{fontFamily:'MON_BOLD',fontSize:17,marginVertical:0,paddingVertical:0}}>{value.user.name}</Text>
                      
                        <Text style={{fontFamily:'MON_REG',marginLeft:5,fontSize:12}}>
                               {value.user.mobile}
                        </Text>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Text style={{backgroundColor:'green',height:12,width:12,borderRadius:6}}></Text>
                            <Text style={{fontFamily:'MON_REG',marginLeft:5,fontSize:12}}>
                                {(value.user.type == '1') ? 'Super admin':'Sub admin'}
                            </Text>
                       </View>

                    </View>
                 </View>
                 <View style={styles.layer1} />
                 <View style={styles.layer2} />
                 <View style={styles.layer3} />
                 <View style={styles.layer4} />
            </View>

        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
        
        <View style={{width:'100%',justifyContent:'center',paddingLeft:18,paddingBottom:20}}>
            <Pressable style={{flexDirection:'row'}} onPress={logOut}>
                <Ionicons name='log-out-outline' size={24} color={Colors.Logo_black}></Ionicons>
                <Text style={{fontFamily:'MON_MED',alignSelf:'center',marginLeft:10}}>Signout</Text>
            </Pressable>
        </View>
        </View>
     );
}
 
const styles = StyleSheet.create({
  header:{
     height:300,
     marginBottom:-190,
     zIndex:-1,
  },
  layer1:{
    height:'100%',
    backgroundColor:Colors.Logo_yellow,
    width:'50%',
    borderBottomRightRadius:120,
    borderTopRightRadius:200,
    borderBottomLeftRadius:80,
    opacity:0.8,
    position:'absolute',
    zIndex:100
  },
  layer2:{
    height:'100%',
    backgroundColor:Colors.Logo_yellow,
    width:'65%',
    borderBottomRightRadius:120,
    borderTopRightRadius:200,
    borderBottomLeftRadius:80,
    opacity:0.7,
    zIndex:90
  },
  layer3:{
    height:'100%',
    backgroundColor:Colors.Logo_yellow,
    width:'75%',
    borderBottomRightRadius:120,
    borderTopRightRadius:200,
    opacity:0.6,
    position:'absolute',
    zIndex:80
  },
  layer4:{
    height:'100%',
    backgroundColor:Colors.Logo_yellow,
    width:'85%',
    borderBottomRightRadius:120,
    borderTopRightRadius:200,
    opacity:0.5,
    position:'absolute',
    zIndex:70
  }
});
export default CustomNavigation;