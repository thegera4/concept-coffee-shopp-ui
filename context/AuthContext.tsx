import { AuthContextType, AuthProviderProps, AuthState } from '@/types/types'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useState } from 'react'

const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_BASE_URL
const TOKEN_KEY = 'jwt-token'
const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Custom hook to access the authentication context
 * @returns The authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

/**
 * Provider for the authentication context
 * @param children - The children components
 * @returns The authentication context provider
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: false, isLoading: true })

  // Load the token from the secure store if it exists
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        if (token) {
          setAuthState({ token: token, authenticated: true, isLoading: false })
        } else {
          setAuthState({ token: null, authenticated: false, isLoading: false })
        }
      } catch (e) {
        console.error('Error loading token:', e)
        setAuthState({ token: null, authenticated: false, isLoading: false })
      }
    }

    loadToken()
  }, [])

  /**
   * Login function to authenticate the user
   * @param username - The username of the user
   * @param password - The password of the user
   */
  const login = async (username: string, password: string) => {
    try {
      //const response = await fetch(`${BACKEND_BASE_URL}v1/users/login`, {
      const response = await fetch(`https://concept-coffee-shop-production.up.railway.app/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      console.log("Login Response: ", response)

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.')
      }
      
      const { data } = await response.json()
      await SecureStore.setItemAsync(TOKEN_KEY, data.token)
      setAuthState({ token: data.token, authenticated: true, isLoading: false })
    } catch (e) {
      console.error("Error while logging in: ", e)
    }
  }

  /**
   * Logout function to clear the token from the secure store
   */
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    setAuthState({ token: null, authenticated: false, isLoading: false })
  }

  // Value to be passed to the AuthContext.Provider
  const value = { login, logout, authState }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 