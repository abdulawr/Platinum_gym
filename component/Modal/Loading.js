import {
    View,
    Text,
    StyleSheet,
    Modal,
    Image
} from 'react-native';
import Colors from '../../constant/Colors';
import Animated, { useSharedValue,withDelay,withRepeat,withTiming,useAnimatedStyle } from 'react-native-reanimated';


const Loading = (props) => {

    const offset = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ rotate:  offset.value + 'deg'}],
        };
     });

     offset.value = withRepeat(withTiming(360), 2, false);

    return (
       <Modal
       animationType="fade"
       transparent={true}
       visible={props.visible}
       >
        <View style={styles.container}>
           <Animated.View style={[styles.subViw, animatedStyles]}>
                <Image style={{width:100,height:100}} source={require("../../assets/images/loading.gif")} />
           </Animated.View>
        </View>
       </Modal>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#29282799'
        },

    subViw:{
        width:150,
        backgroundColor:Colors.Logo_yellow,
        height:150,
        borderRadius:5,
        elevation:8,
        justifyContent:'center',
        alignItems:'center'
    }
}) 
export default Loading;