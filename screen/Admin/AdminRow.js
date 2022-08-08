import {
View,
Text,
StyleSheet,
Image,
TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Loading from '../../component/Modal/Loading';
import Colors from '../../constant/Colors';

const AdminRow = (props) => {
    let item = props.item;
    let email = props.email;

    let nameColor= Colors.Logo_black;
    if(email == item.email){
        nameColor = '#50C878';
    }

    return ( 
       
        <TouchableOpacity onPress={() => props.openProfile(item)} style={styles.container}>
              <View style={styles.section_1}>
                 <Image style={styles.images} source={ (item.image == null || item.image == 'null') ? require('../../assets/images/color_logo.png') : {uri:item.image}} />
              </View>

              <View style={styles.section_2}>
                  
                  <Text style={{fontFamily:'MON_BOLD',fontSize:17,marginTop:4,color:nameColor}}>{item.name}</Text>
                  <Text style={{fontFamily:'MON_REG',fontSize:12}}>{item.email}</Text>

                  {(email != item.email) &&
                  <Text style={{fontFamily:'MON_BOLD',fontSize:12,color:'#D2042D'}}><Text>Pending: </Text> {item.balance}</Text>
                  }

                <View style={{flexDirection:'row',alignItems:'center'}}>
                   {(email == item.email) &&
                   <Text style={{backgroundColor:'green',height:12,width:12,borderRadius:6,marginRight:3}}></Text>
                    }
                   <Text style={{fontFamily:'MON_REG',fontSize:12,color:'#454B1B'}}>{(item.type == '1') ? 'Super admin' : 'Sub admin'}</Text>
                </View>

                 {/* <View style={{flexDirection:'row',marginTop:5,alignSelf:'flex-end',marginRight:10}}>
                     <MaterialCommunityIcons onPress={resentPassword} style={{marginLeft:10}} name="lock-reset" size={24} color="#707070" />
                     <MaterialCommunityIcons style={{marginLeft:10}} name="eye-arrow-right" size={24} color="#707070" />

                     {item.type == '2' &&
                         <MaterialCommunityIcons style={{marginLeft:10}} name="delete" size={24} color="#707070" />
                     }
                 </View> */}

              </View>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    container:{
      height:95,
      backgroundColor:'white',
      marginVertical:8,
      marginHorizontal:8,
      borderRadius:8,
      elevation:5,
      flexDirection:'row',
      marginLeft:38,
     },
    section_1:{
        height:'100%',
        flex:1,
        justifyContent:'center',
        borderRadius:5,
    },
    section_2:{
        height:'100%',
        flex:4.3,
        borderRadius:5,
    },
    images:{
        width:75,
        height:75,
        borderRadius:5,
        marginLeft:-30
    }
})
 
export default AdminRow;