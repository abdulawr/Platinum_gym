import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './navigation/Navigation';
import MyContext from './context/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from './config/firebase';


export default function App() {

  // type - 1 super admin
  // type - 2 sub admin

  let timer;

  const[fonts,setFonts] = useState(false);
  const[contextValue,setContextValue] = useState({
    login:(value) => {
       setContextValue(value);
    },
    logout: () => {
      logOut();
    },
    autoLogout: (expTime,navigation) => {
      autoLogout(expTime,navigation);
    },
    user: null
  });

  const logOut = async () => {
    await AsyncStorage.clear();
    setContextValue({
      ...contextValue,user:null
    }); 

    if(timer){
      clearTimeout(timer)
    }
  }

  const autoLogout = (expTime,navigation) => {
    timer = setTimeout(()=>{
        logOut();
        alert("Session expired!");
        navigation.replace("Landing");
        console.log("=================> Auto Logout")
    },expTime);
 }
  
  const loadFonts = async() => {
    SplashScreen.preventAutoHideAsync();
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
    <MyContext.Provider value={contextValue}>
      <Navigation />
    </MyContext.Provider>
  );
}

