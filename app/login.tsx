import { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CustomAlert from '../components/CustomAlert'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    try{
      await login(email, password)
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : 'Error')
      setAlertVisible(true)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>COFFEE SHOP</Text>
        <Text style={styles.subtitle}>Concept Mobile App</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#7D5A5A"
          value={email}
          onChangeText={setEmail}
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
          style={[styles.loginButton, (!email || !password) && styles.disabledButton]}
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupText}>Do not have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    
      <CustomAlert
        visible={alertVisible}
        title="Login Error"
        message={alertMessage}
        type="error"
        confirmText="OK"
        onConfirm={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
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