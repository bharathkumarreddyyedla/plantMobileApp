import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/loginScreens/signInScreen';
import SignUpScreen from './src/screens/loginScreens/signUpScreen';
// 

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen/>
      {/* <SignUpScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
