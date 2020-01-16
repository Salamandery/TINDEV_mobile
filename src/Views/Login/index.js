import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../api';

import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

  function Login({ navigation }) {
      const [user, setUser] = useState('');

      async function loginHandler() {
         console.log(user);
         const response = await Api.post('/devs', {username: user});
         const { _id } = response.data;
         console.log(_id);
         await AsyncStorage.setItem('user', _id);
         
         navigation.navigate('Main', {user: _id});
      }
      useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', {user});
            }
        })
      }, []);
      return(
        <KeyboardAvoidingView style={styles.container}
                              enabled={Platform.OS === 'ios'}
                              behavior="padding"
        >
            <Text style={styles.text}>Tindev</Text>
            <TextInput placeholder="Digite seu usuário" 
                       style={styles.input}
                       placeholderTextColor="#999"
                       autoCapitalize="none"
                       autoCorrect={false}
                       value={user}
                       onChangeText={setUser}
            />
            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                <Text style={styles.TextButton}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'purple'
    },
    input: {
        height: 68,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
        fontSize: 24
    },
    button: {
        height: 48,
        alignSelf: 'stretch',
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
    },
    TextButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
   });

  export default Login;