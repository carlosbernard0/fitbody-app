import type { ReactNode } from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { globalFonts } from '@/styles/globalFonts'

interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean
  onPress?: () => void
  children: ReactNode
}

export const Button = ({
  onPress,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge(
        'border border-white p-3 rounded-3xl w-[45%] ',
        className
      )}
      style={props.style}
      {...props}
    >
      <Text
        className={'text-center text-white'}
        style={globalFonts.poppinsBold}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
