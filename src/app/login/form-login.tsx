import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { User } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { loginSchema } from './login-schema'
import type { FormLoginData } from './login-schema'

interface FormLoginProps {
  handleLogin: (data: FormLoginData) => void
  loadingLogin: boolean
}

export const FormLogin = ({ handleLogin, loadingLogin }: FormLoginProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <View className="bg-lightpurple w-full h-72 items-center justify-center gap-4">
        <View className="w-2/3 gap-2">
          <Text className="text-lg font-bold">Usarname or email</Text>
          <Controller
            control={control}
            name="login"
            render={({ field }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                icon={<User color="#6C757D" />}
                placeholder="example@example.com"
              />
            )}
          />
          {errors.login && (
            <Text className="text-red-500 mt-1">{errors.login.message}</Text>
          )}
        </View>
        <View className="w-2/3 gap-2">
          <Text className="text-lg font-bold">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry
                placeholder="*************"
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 mt-1">{errors.password.message}</Text>
          )}
          <TouchableOpacity
            onPress={() => router.push('/login/forgot')}
            className="items-end pt-5"
          >
            <Text className="font-semibold text-sm">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-black items-center pt-10">
        <Button
          onPress={handleSubmit(handleLogin)}
          className="bg-blacksecundary"
        >
          {loadingLogin ? <ActivityIndicator /> : <Text>Log In</Text>}
        </Button>
      </View>
    </>
  )
}
