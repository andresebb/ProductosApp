import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Background} from '../components/BackGround';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/LoginTheme';

export const LoginScreen = () => {
  return (
    <>
      <Background />

      <View style={loginStyles.formContainer}>
        {/* Keyboard avoid view */}
        <WhiteLogo />

        <Text style={loginStyles.title}>Login</Text>

        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder="Ingrese su email:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          underlineColorAndroid="white"
          style={[
            loginStyles.inputField,
            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
          ]}
          selectionColor="white"
          // onChangeText={value => onChange(value, 'email')}
          // value={email}
          // onSubmitEditing={onLogin}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={loginStyles.label}>Password:</Text>
        <TextInput
          placeholder="******"
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          secureTextEntry
          style={[
            loginStyles.inputField,
            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
          ]}
          selectionColor="white"
          // onChangeText={value => onChange(value, 'password')}
          // value={password}
          // onSubmitEditing={onLogin}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Button login */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            // onPress={onLogin}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={loginStyles.buttonText}>New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
