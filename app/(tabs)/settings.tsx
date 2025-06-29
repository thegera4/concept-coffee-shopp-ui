import CustomAlert from '@/components/CustomAlert'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'

const profileImage = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'

const settingsOptions = [
  { label: 'App Settings', icon: 'settings' },
  { label: 'Payment Methods', icon: 'credit-card' },
  { label: 'Contact Us', icon: 'phone' },
  { label: 'Locate Nearest Store', icon: 'location-on' },
  { label: 'Logout', icon: 'logout' },
]

export default function SettingsScreen() {
  const { logout } = useAuth()
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleOptionPress = (option: string) => {
    if (option === 'Logout') {
      setAlertMessage('Are you sure you want to logout?')
      setAlertVisible(true)
    } else {
      console.log(`Option clicked: ${option}`)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Settings</Text>
      <Image source={{ uri: profileImage }} style={styles.avatar} />
      <Text style={styles.name}>Sophia Carter</Text>
      <View style={styles.optionsContainer}>
        {settingsOptions.map((option, idx) => (
          <TouchableOpacity 
            key={option.label} 
            style={styles.optionRow} 
            activeOpacity={0.7}
            onPress={() => handleOptionPress(option.label)}
          >
            <Text style={styles.optionLabel}>{option.label}</Text>
            <IconSymbol name={option.icon as any} size={22} color="#222" />
          </TouchableOpacity>
        ))}
      </View>
      <CustomAlert 
        visible={alertVisible}
        title='Logout'
        message={alertMessage}
        onConfirm={logout}
        onCancel={() => setAlertVisible(false)}
        confirmText = 'YES'
        cancelText = 'NO'
        type = 'warning'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F2',
    alignItems: 'center',
    paddingTop: 32,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 24,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
    fontSize: 16,
    color: '#222',
  },
})