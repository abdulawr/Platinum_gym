import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Colors from '../../constant/Colors';


const MemberRow = (props) => {

    const {item} = props;
   
   const date =  new Date(item.join_date.seconds * 1000).toLocaleDateString()

    return ( 
        <View style={styles.container}>

            <View style={styles.slide_1}>
                <Image style={styles.image} source={(item.image == null) ? require("../../assets/images/color_logo.png") : {uri:item.image} } />
            </View>

            <View style={styles.slide_2}>
                <Text style={{fontFamily:'MON_BOLD',fontSize:18}}>{item.name}</Text>
              
                <View style={{flexDirection:'row',marginVertical:3,alignItems:'center'}}>
                    <MaterialCommunityIcons style={{marginRight:5}} name="credit-card" size={14} color="#707070" />
                    <Text style={{fontFamily:'MON_REG',fontSize:12}}>{item.cnic}</Text>
                </View>

                <View style={{flexDirection:'row',marginVertical:1,alignItems:'center'}}>
                    <MaterialCommunityIcons style={{marginRight:5}} name="phone-forward-outline" size={14} color="#707070" />
                    <Text style={{fontFamily:'MON_REG',fontSize:12}}>{item.mobile}</Text>
                </View>

                <View style={{flexDirection:'row',marginVertical:1,alignItems:'center'}}>
                    <MaterialCommunityIcons style={{marginRight:5}} name="clock-time-eight" size={14} color="#707070" />
                    <Text style={{fontFamily:'MON_REG',fontSize:12}}>{date}</Text>
                </View>

            </View>

            <View style={styles.slide_3}>
                <TouchableOpacity onPress={()=> props.openProfile(item)} style={styles.icon}>
                   <MaterialCommunityIcons name="eye" size={30} color={Colors.Logo_yellow} />
                </TouchableOpacity>
            </View>

        </View>
     );
}
 
const styles = StyleSheet.create({
    container:{
      width:Dimensions.get('window').width - 450,
      elevation:6,
      backgroundColor:'white',
      marginVertical:10,
      marginHorizontal:10,
      flexDirection:'row',
      marginLeft:30,
      marginTop:28,
      borderRadius:8,
      marginRight:24
    },
    slide_1:{
      flex:1.1,
      borderRadius:8
    },
    slide_2:{
     flex:4.5,
     paddingVertical:5,
     borderRadius:8
    },
    image:{
        width:70,
        borderRadius:35,
        height:70,
        marginLeft:-25,
        marginTop:-25
    },
    slide_3:{
        flex:1,
        paddingVertical:5,
        borderRadius:8,
       },
       icon:{
          backgroundColor: Colors.Logo_black,
          width:50,
          height:50,
          borderRadius:25,
          justifyContent:'center',
          alignItems:'center',
          right:-15,
          bottom:-45
       }
})
export default MemberRow;