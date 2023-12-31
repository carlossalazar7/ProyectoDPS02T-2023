import React, { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import variables from './src/utis/variables';
import { styles } from './src/styles/styles';
import FormComponent from './src/components/login/form.component';
import LoginComponent from './src/components/login/logout.component';
import { auth } from './src/utis/firebase';
import SocialNetworks from './src/components/login/social.networks.component';
import Separator from './src/components/generic/separator.component';
import CreateAccountTemplate from './src/components/login/create.account.component';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/components/generic/home.component';
import SettingPage from './src/components/generic/setting.component';
import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/components/HomeScreen';
import { Image, Text, View } from "react-native";
import MantenimientoEmpresasAndroi from './src/components/MantenimientoEmpresasAndroi';
import HomePageUsuario from "./src/components/HomePageUsuario";

const AppMain = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Tab = createBottomTabNavigator();
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: variables.WEBCLIENTID,
            offlineAccess: false
        })

        const splashTimer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000);

        return () => clearTimeout(splashTimer);
    }, [usuario, isLoggedIn])


    const navigateToHome = () => {
        setIsSplashVisible(false);
    };

    const SettingComponent = props => (
        <SettingPage signOut={signOut} {...props} />
      );

    function MyTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="HomeCupones"
                    options={{
                        title: 'HomeCupones',
                        activeTintColor: 'white',
                        inactiveTintColor: '#d9d9d9',
                        tabBarIcon: () => {
                            return (
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('./src/img/cupon.png')} />
                            );
                        },
                    }}
                    component={HomePageUsuario} />
                <Tab.Screen name="Home"
                    options={{
                        title: 'Home',
                        activeTintColor: 'white',
                        inactiveTintColor: '#d9d9d9',
                        tabBarIcon: () => {
                            return (
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('./src/img/home.png')} />
                            );
                        },
                    }}
                    component={HomePage} initialParams={usuario} />
                <Tab.Screen name="Cupones"
                    options={{
                        title: 'Cupones',
                        activeTintColor: 'white',
                        inactiveTintColor: '#d9d9d9',
                        tabBarIcon: () => {
                            return (
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('./src/img/cupon.png')} />
                            );
                        },
                    }}
                    component={HomeScreen} />
                <Tab.Screen name="Settings"
                    options={{
                        title: 'Settings',
                        activeTintColor: 'white',
                        inactiveTintColor: '#d9d9d9',
                        tabBarIcon: () => {
                            return (
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('./src/img/confimg.png')} />
                            );
                        },
                    }}
                    component={SettingComponent}
                />
                <Tab.Screen name="Empresas"
                    options={{
                        title: 'Empresas',
                        activeTintColor: 'white',
                        inactiveTintColor: '#d9d9d9',
                        tabBarIcon: () => {
                            return (
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('./src/img/empresa.png')} />
                            );
                        },
                    }}
                    component={MantenimientoEmpresasAndroi} />
            </Tab.Navigator>
        );
    }


    const googleLogin = async () => {
        try {
            console.log("TRYING CONNECTION TO GOOGLE!!")
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            setUsuario(userInfo.user);
            console.log("userinfo", usuario);
            setIsLoggedIn(true);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
            }
        }
    };

    async function signOut() {
        try {
            setIsLoggedIn(false)
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()

        } catch (error) {
            console.log('Something else went wrong... ', error.toString())
        }
    }

    async function logInBase() {
        try {
            console.log("LOGIN BASE, usuario " + username + " pass " + password);
            auth.signInWithEmailAndPassword(username, password)
                .then((userCredential) => {
                    console.log(userCredential);
                    setUsuario(userCredential);
                    setIsLoggedIn(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.log('Something else went wrong... ', error.toString())
        }
    }


    async function createAccount() {
        console.log("CREATE ACCOUNT, usuario " + username + " email " + email + " pass " + password);

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setUsuario(userCredential);
                setIsLoggedIn(true);
                setIsCreateAccount(false);
            })
            .catch((error) => {
                console.log('Something else went wrong... ', error.toString())
            });

    }

    if (isCreateAccount) {
        return (
            <CreateAccountTemplate
                createAccount={createAccount}
                setIsLoggedIn={setIsLoggedIn}
                setIsCreateAccount={setIsCreateAccount}
                googleLogin={googleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
                setEmail={setEmail} />
        );
    } else if (isLoggedIn == !true) {
        return (
            isSplashVisible ? <SplashScreen navigation={navigateToHome} /> :
                (
                    <View style={styles.container}>
                        <FormComponent
                            setUsername={setUsername}
                            setPassword={setPassword}
                            setIsCreateAccount={setIsCreateAccount}
                            logInBase={logInBase}
                            createAccount={createAccount}
                        />
                        <Separator />
                        <SocialNetworks
                            googleLogin={googleLogin} />
                    </View>
                )
        );

    } else {
        return (
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>);
    }

}


export default AppMain;