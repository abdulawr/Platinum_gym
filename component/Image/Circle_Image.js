import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';


const Circle_Image = (props) => {

    const width = props.width;
    const n_width = width + 6;
    const radius = width / 2;
    const n_radius = n_width / 2;

    return ( 
        <View>
                <LinearGradient
                    style={[styles.gradientContainer,{width:n_width,height:n_width,borderRadius:n_radius}]}
                    colors={[Colors.Logo_black, '#2E5090', Colors.Logo_yellow]}>
                    <Image style={{width:width,height:width,borderRadius:radius}} source={props.uri} />
                </LinearGradient>
        </View>
     );
}

const styles = StyleSheet.create({
    gradientContainer:{
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
})
 
export default Circle_Image;