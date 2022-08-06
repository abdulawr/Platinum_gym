import{
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import Colors from '../../constant/Colors';

const Input_b = (props) => {
    return ( 
        <TextInput
          style={[styles.input,props.styles]}
          placeholderTextColor={Colors.Logo_black}
          {...props}
        />
     );
}

const styles = StyleSheet.create({
    input:{
      width:'89%',
      fontFamily:'MON_REG',
      color:Colors.Logo_black,
      height:55,
      paddingHorizontal:8,
      borderWidth:1,
      borderColor:Colors.Logo_black,
      marginTop:10,
      borderRadius:8
    }
})
 
export default Input_b;