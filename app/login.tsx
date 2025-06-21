import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    const loginResponse = await login(username, password)
    // add alerts
    console.log("login response: ", loginResponse)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>COFFEE SHOP</Text>
      <Text style={styles.subtitle}>Concept Mobile App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#7D5A5A"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7D5A5A"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.loginButton, (!username || !password) && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!username || !password}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signupText}>Do not have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A2C2A',
    fontFamily: 'SpaceMono-Regular',
  },
  subtitle: {
    fontSize: 20,
    color: '#4A2C2A',
    marginBottom: 40,
    fontFamily: 'SpaceMono-Regular',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0E5D9',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#4A2C2A',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E8772E',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#E8772E',
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    color: '#4A2C2A',
    fontSize: 14,
  },
})