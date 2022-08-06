import {
View,
Text,
StyleSheet,
Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Loading from '../../component/Modal/Loading';

const AdminRow = (props) => {
    let item = props.item;

    const resentPassword = () => {

    }

    return ( 
        <View style={styles.container}>

              <View style={styles.section_1}>
                 <Image style={styles.images} source={ (item.image == null) ? require('../../assets/images/color_logo.png') : {uri:item.image}} />
              </View>

              <View style={styles.section_2}>
                  <Text style={{fontFamily:'MON_BOLD',fontSize:17,marginTop:4}}>{item.name}</Text>
                  <Text style={{fontFamily:'MON_REG',fontSize:12}}>{item.email}</Text>
                  <Text style={{fontFamily:'MON_BOLD',fontSize:12,color:'#D2042D'}}><Text>Pending: </Text> {item.balance}</Text>
               
                 <View style={{flexDirection:'row',marginTop:5,alignSelf:'flex-end',marginRight:10}}>
                     <MaterialCommunityIcons onPress={resentPassword} style={{marginLeft:10}} name="lock-reset" size={24} color="#707070" />
                     <MaterialCommunityIcons style={{marginLeft:10}} name="eye-arrow-right" size={24} color="#707070" />
                     <MaterialCommunityIcons style={{marginLeft:10}} name="delete" size={24} color="#707070" />
                 </View>

              </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
      height:100,
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
        width:80,
        height:80,
        borderRadius:5,
        marginLeft:-30
    }
})
 
export default AdminRow;