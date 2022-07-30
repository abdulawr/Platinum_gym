import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from './constant/Colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './navigation/Navigation';

export default function App() {

  const[fonts,setFonts] = useState(false);
  SplashScreen.preventAutoHideAsync();

  const loadFonts = async() => {
    await Font.loadAsync({
         MON_REG: require('./assets/fonts/Mon_Reg.ttf'),
         MON_MED: require('./assets/fonts/Mon_Medium.ttf'),
         MON_BOLD: require('./assets/fonts/Mon_Bold.ttf'),
         MON_ITALIC: require('./assets/fonts/Mon_Italic.ttf'),
      });

      setFonts(true);
      await SplashScreen.hideAsync();
    };

  useEffect(()=>{
    loadFonts();
  },[]);

  if(!fonts){
    return null;
  }
  
  return (
    <Navigation />
  );
}

