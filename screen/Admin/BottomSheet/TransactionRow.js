import {
 View,
 Text,
 StyleSheet
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const TransactionRow = (props) => {

    const item = props.item;
    const date =  new Date(item.date.seconds * 1000).toDateString()
    //const {navigation} = props;

    return (
        <View style={styles.container}>
             <View style={{flex:1,paddingLeft:12}}>
                 <Text style={{fontFamily:'MON_BOLD'}}>{item.name}</Text>
                 <Text style={{fontFamily:'MON_REG'}}>{item.addedFor}</Text>
                 <Text style={{color:"#008080",fontFamily:'MON_REG'}}>{item.amount} PKR</Text>
                 <Text style={{color:'#707070',fontSize:13}}>{date}</Text>

                 {item.des != null &&
                 <Text style={{color:'#707070',fontSize:13}}>{item.des}</Text> }

             </View>

             <View style={{paddingRight:10}}>
        {(props.check != false) &&
           
                <MaterialCommunityIcons onPress={() => props.completeTranscation(item)} name="check-all" size={35} color="#00A36C" />
          
        }

         </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container:{
        borderBottomColor:'#C0C0C0',
        borderBottomWidth:.8,
        paddingBottom:7,
        paddingVertical:8,
        flexDirection:'row',
        alignItems:'center'
    },
});

export default TransactionRow;