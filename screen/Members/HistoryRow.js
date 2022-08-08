import {
 View,
 Text,
 StyleSheet
} from 'react-native';
import Colors from '../../constant/Colors';

const HistoryRow = (props) => {
    const {item} = props;

    const date =  new Date(item.date.seconds * 1000).toDateString()
     
    return ( 
        <View style={styles.container}>
            <Text style={{fontFamily:"MON_REG",backgroundColor:Colors.Logo_black,color:Colors.Logo_yellow,paddingVertical:3,textAlign:'center'}}>{date}</Text>
           
           <View style={{paddingHorizontal:10,paddingVertical:10}}>
               <Text style={{fontFamily:'MON_BOLD'}}>{item.amount}  PKR</Text>
               {(item.des != null) &&
                 <Text style={{fontFamily:'MON_REG'}}>{item.des}</Text>
               }
           </View>
           
        </View>
     );
}
 
const styles = StyleSheet.create({
   container:{
     marginVertical:10,
     backgroundColor:'white',
     elevation:5,
     marginHorizontal:10,
     borderRadius:8,
     overflow:'hidden'
   }
})

export default HistoryRow;