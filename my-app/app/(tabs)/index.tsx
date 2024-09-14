import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './../../src/firebaseConfig'; // Ajusta la ruta según tu estructura de carpetas

export default function AuthScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter(); // Usa useRouter para la navegación

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, username, password);
        Alert.alert('Inicio de sesión exitosa', '¡Has iniciado sesión exitosamente!');
        // Redirige a la pantalla "explore"
        router.push('/explore'); // Usa router.push para navegar a la pantalla "explore"
      } else {
        await createUserWithEmailAndPassword(auth, username, password);
        Alert.alert('Registro exitoso', '¡Te has registrado exitosamente!');
        // Cambia al modo de inicio de sesión después de registrarse
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Falló la autenticación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'iniciar sesión' : 'Registrar'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={isLogin ? 'iniciar sesión' : 'Registrar'} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes una cuenta? Inicia sesión aquí'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  switchText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 16,
  },
});
