import React from 'react'
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomAlertProps } from '@/types/types'

const { width } = Dimensions.get('window')

export default function CustomAlert({visible, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel', type = 'info'}: CustomAlertProps) {
  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#E8F5E8', borderColor: '#4CAF50', iconColor: '#4CAF50' }
      case 'error':
        return { backgroundColor: '#FFEBEE', borderColor: '#F44336', iconColor: '#F44336' }
      case 'warning':
        return { backgroundColor: '#FFF3E0', borderColor: '#FF9800', iconColor: '#FF9800' }
      default:
        return { backgroundColor: '#F0E5D9', borderColor: '#E8772E', iconColor: '#E8772E' }
    }
  }

  const colors = getTypeColors()

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor }]}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: colors.iconColor }]}>
              <Text style={styles.iconText}>
                {type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
              </Text>
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            { onCancel && (
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm || onCancel}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    width: width - 40,
    backgroundColor: '#F0E5D9',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A2C2A',
    fontFamily: 'SpaceMono-Regular',
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#4A2C2A',
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: 'SpaceMono-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#7D5A5A',
  },
  confirmButton: {
    backgroundColor: '#E8772E',
  },
  cancelButtonText: {
    color: '#7D5A5A',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SpaceMono-Regular',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono-Regular',
  },
}) 