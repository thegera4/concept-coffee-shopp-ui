import { ReactNode } from "react"

export interface AuthState {
  token: string | null
  authenticated: boolean
  isLoading: boolean
}

export interface AuthContextType {
  login: (username: string, password:string) => Promise<void>
  logout: () => Promise<void>
  authState: AuthState
}

export interface AuthProviderProps {
  children: ReactNode
}

export interface CustomAlertProps {
  visible: boolean
  title: string
  message: string
  onConfirm: (option: string) => void
  onCancel?: () => void
  confirmText: string
  cancelText?: string
  type: 'success' | 'error' | 'warning' | 'info'
}
