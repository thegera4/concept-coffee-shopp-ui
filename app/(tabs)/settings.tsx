import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'

const profileImage = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'

const settingsOptions = [
  { label: 'App Settings', icon: '⚙️' },
  { label: 'Payment Methods', icon: '💳' },
  { label: 'Contact Us', icon: '📞' },
  { label: 'Locate Nearest Store', icon: '📍' },
  { label: 'Logout', icon: '🚪' },
]

export default function SettingsScreen() {
  const { logout } = useAuth()

  const handleOptionPress = (option: string) => {
    if (option === 'Logout') {
      Alert.alert('Exit', 'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', 
            style: 'destructive',
            onPress: async () => {
              try {
                await logout()
              } catch (error) {
                console.error('Logout failed:', error)
                Alert.alert('Error', 'Failed to logout. Please try again.')
              }
            }
          }
        ]
      )
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
            <Text style={styles.optionIcon}>{option.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  optionIcon: {
    fontSize: 22,
    color: '#222',
  },
})