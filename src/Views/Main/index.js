import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, SafeAreaView, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../api';

function Main({navigation}) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: id }
            });
            setUsers(response.data);
        };
        loadUsers();
    }, [id]);
    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login'); 
    }
    async function like() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }
    async function dislike() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.text}>Tinder</Text>
            </TouchableOpacity>
            <View style={styles.counter}>
                <Text style={styles.count}>{users.length}</Text>
            </View>
            <View style={styles.cards}>
                { users.length === 0 ? <Text style={styles.empty}>Sem usuários para avaliar :(</Text> : (
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, {zIndex: users.length - index } ]}>
                            <Image style={styles.avatar} source={{uri: user.avatar}}/>
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text> 
                            </View>
                        </View>
                    ))
                )}
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={like}>
                    <Text style={styles.lbButton}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={dislike}>
                    <Text style={styles.lbButton}>Não</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    counter: {
        height: 20,
        width: 20,
        borderRadius: 25,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .02,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    count: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30
    },
    text: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 26,
        color: 'purple'
    },
    cards: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .02,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    empty: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20
    },
    lbButton: {

    }
});
export default Main;