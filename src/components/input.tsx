import { Eye, EyeOff } from 'lucide-react-native'
import { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import type { TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  icon?: React.ReactNode
  secureTextEntry?: boolean
  disabled?: boolean
}

export function Input({
  icon,
  disabled,
  secureTextEntry,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = secureTextEntry === true

  return (
    <View className="border border-white bg-white rounded-xl flex-row items-center justify-between gap-2">
      <TextInput
        className="text-whitepat ml-2 flex-1 "
        placeholderTextColor="#6C757D"
        secureTextEntry={isPassword && !showPassword}
        editable={!disabled}
        keyboardType="default"
        {...props}
      />

      {icon && <View className="mr-3">{icon}</View>}

      {isPassword && (
        <TouchableOpacity
          className="mr-3"
          onPress={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <Eye color="#c9c9c9" /> : <EyeOff color="#c9c9c9" />}
        </TouchableOpacity>
      )}
    </View>
  )
}
