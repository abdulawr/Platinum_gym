import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Colors from '../../constant/Colors';


const Button_c = (props) => {

   var design = {};

   // oy =  Yellow outline button
   // ob = Black outline button
   // y = Yellow background button
   // b = Black background button

   let testColor = Colors.Logo_black;
    if(props.type == "oy"){
       design={
           borderColor:Colors.Logo_yellow
        }
    }
    else if(props.type == "ob"){
        design={
        borderColor:Colors.Logo_black
        }
    }
    else if(props.type == "y"){
        design={
            backgroundColor:Colors.Logo_yellow,
            borderWidth:0.5
        }
    }
    else if(props.type == "b"){
        design={
            backgroundColor:Colors.Logo_black,
            borderColor:Colors.Logo_yellow,
            borderWidth:1,
        };

     testColor=Colors.Logo_yellow;
    }
    

    const styles = StyleSheet.create({
        btn:{
           width:'70%',
           alignSelf:'center',
           paddingVertical:13,
           borderRadius:5,
           borderWidth:2,
           ...design,
        },
        text:{
            alignSelf:'center',
            fontFamily:'MON_MED',
            color:testColor
        }
    })

    return ( 
        <TouchableOpacity onPress={props.onClick} style={[styles.btn,props.style]}>
             <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
     );
}

 
export default Button_c;