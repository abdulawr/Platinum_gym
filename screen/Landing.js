import {
 View,
 Text,
 StyleSheet
} from 'react-native';

const Landing = () => {
    return ( 
        <View style={styles.container}>
            <Text>Welcome</Text>
        </View>
     );
}
 
const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 }
});

export default Landing;