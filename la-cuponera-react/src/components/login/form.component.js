import React, { useState } from 'react';
import { styles } from '../../utis/styles';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements'
import ForgotPassword from './forgot.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../utis/colors';


function FormComponent(props) {
    const { setUsername, setPassword, setIsCreateAccount } = props;
    const { logInBase } = props;
    const [showPassword, setShowPassword] = useState(false);

    function createAccountFunction() {
        console.log("CREAR CUENTA!");
        setIsCreateAccount(true);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Text style={styles.text}>Iniciar Sessión</Text>
            <Text style={styles.text}>Bienvenido de nuevo!</Text>

            <View style={styles.viewForm}>
                <TextInput
                    placeholder="Ingrese su usuario o correo"
                    keyboardType="default"
                    style={styles.input}
                    onChange={(e) => setUsername(e.nativeEvent.text)}
                />
                <View style={styles.container2}>
                    <TextInput
                        placeholder="Digite su contraseña"
                        secureTextEntry={!showPassword}
                        onChange={(e) => setPassword(e.nativeEvent.text)}
                        style={styles.input}

                        placeholderTextColor="#aaa"
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.icon}
                        onPress={toggleShowPassword} />
                </View>
                <ForgotPassword />

                <SocialIcon
                    title='Iniciar Sesión'
                    button
                    onPress={logInBase}
                    style={{ backgroundColor: '#3b5998' }}
                    color="blue"
                />
                <View style={{ display: 'flex' }}>
                    <Text style={styles.sincuenta}>No tienes una cuenta?</Text>
                    <TouchableOpacity onPress={createAccountFunction}>
                        <Text style={styles.forgot}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
}

export default FormComponent;