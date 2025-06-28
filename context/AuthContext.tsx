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
   * @param email - The email of the user
   * @param password - The password of the user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const loginUrl = `${BACKEND_BASE_URL}api/v1/users/login`     
      const requestBody = JSON.stringify({ email, password })
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: requestBody,
      })
      const responseText = await response.text()

      if (!response.ok) {
        let errorMessage = 'Login failed. Please check your credentials.'
        try {
          if (responseText) {
            const errorData = JSON.parse(responseText)
            errorMessage = errorData.message || errorData.error || errorMessage
          }
        } catch (parseError) {
          throw new Error('Could not parse error response as JSON: ' + parseError)
        }
        throw new Error(errorMessage)
      }
      
      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error('Could not parse response from server as JSON: ' + parseError)
      }
      
      const { data } = responseData
      if (!data.token) { 
        throw new Error('No token received from the server.')
      } 
      
      await SecureStore.setItemAsync(TOKEN_KEY, data.token)
      setAuthState({ token: data.token, authenticated: true, isLoading: false })
    } catch (e) {
      console.error("Error while logging in: ", e)
      throw e // Re-throw the error so it can be caught by the calling function
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