import{
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import Colors from '../../constant/Colors';

const Input = (props) => {
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
      width:'86%',
      fontFamily:'MON_REG',
      color:Colors.Logo_black,
      height:55,
      paddingHorizontal:5,
      borderBottomColor:Colors.Logo_black,
      borderBottomWidth:1,
      marginTop:10
    }
})
 
export default Input;