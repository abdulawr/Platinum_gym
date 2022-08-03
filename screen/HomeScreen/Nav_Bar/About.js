import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import Circle_Image from '../../../component/Image/Circle_Image';
import Colors from '../../../constant/Colors';

const About = () => {
    return ( 
        <ScrollView style={{flex:1,flexGrow:1}}>
        <View style={styles.container}>

          <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{height:1,backgroundColor:Colors.Logo_black,flex:1}}></View>
               <Text style={{fontFamily:"MON_BOLD",textAlign:'center',fontSize:18,flex:2.5}}>Platinum GYM</Text>
               <View style={{height:1,backgroundColor:Colors.Logo_black,flex:1}}></View>
          </View>

            <View style={{alignItems:'center',marginTop:10}}>
                <Circle_Image width={130} uri={require("../../../assets/images/profile.jpg")} />
            </View>


           <View style={{paddingHorizontal:10,paddingVertical:10,}}>

           <Text style={{textAlign:'justify',fontFamily:'MON_REG'}}>
            Platinum gym app is developed by Sr. Abdul Basit and the app copy right belong to @AB. The gym owner has only right to use the app and the developer restricted the gym to not share the app with other gyms.
            </Text>

           </View>


           <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{height:1,backgroundColor:Colors.Logo_black,flex:1}}></View>
               <Text style={{fontFamily:"MON_BOLD",textAlign:'center',fontSize:18,flex:2.5}}>Developer</Text>
               <View style={{height:1,backgroundColor:Colors.Logo_black,flex:1}}></View>
          </View>

          <Text style={{fontFamily:'MON_BOLD',marginTop:15}}>
             Name   <Text style={{fontFamily:'MON_REG'}}>Abdul Basit</Text>
          </Text>
          <Text style={{fontFamily:'MON_BOLD'}}>
             Mobile   <Text style={{fontFamily:'MON_REG'}}>0305-9235079</Text>
          </Text>
          <Text style={{fontFamily:'MON_BOLD',marginBottom:10}}>
             Email   <Text style={{fontFamily:'MON_REG'}}>tcomprog@gmail.com</Text>
          </Text>
        
        </View>
        </ScrollView>
     );
}
 
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
      margin:10,
      borderRadius:10,
      elevation:6,
      padding:10,
      flexGrow:1
    }
})
export default About;