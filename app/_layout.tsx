import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-reanimated'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { useColorScheme } from '../hooks/useColorScheme'

const RootLayoutNav = () => {
  const { authState } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (authState.isLoading) return
    const inApp = segments[0] === '(tabs)'
    if (authState.authenticated && !inApp) {
      router.replace('/(tabs)/home')
    } else if (!authState.authenticated && segments[0] !== 'login') {
      router.replace('/login')
    }
  }, [authState.isLoading, authState.authenticated, segments, router])

  if (authState.isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="article" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) return null

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  )
}