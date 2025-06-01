import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { globalFonts } from '@/styles/globalFonts'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { type FormRegisterData, registerSchema } from './register-schema'

interface FormRegisterProps {
  handleRegister: (data: FormRegisterData) => void
  loadingRegister: boolean
}

export const FormRegister = ({
  handleRegister,
  loadingRegister,
}: FormRegisterProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <>
      <ScrollView className="flex-1">
        <View className="bg-lightpurple w-full min-h-[394px] py-4 items-center justify-center gap-4 ">
          <View className="w-2/3 gap-2">
            <Text className="text-lg font-bold">Username</Text>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  icon={<User color="#6C757D" />}
                  placeholder="example_01"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 mt-1">{errors.name.message}</Text>
            )}
          </View>
          <View className="w-2/3 gap-2">
            <Text className="text-lg font-bold">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  icon={<User color="#6C757D" />}
                  placeholder="example@example.com"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 mt-1">{errors.email.message}</Text>
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
              <Text className="text-red-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>
          <View className="w-2/3 gap-2">
            <Text className="text-lg font-bold">Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry
                  placeholder="*************"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="bg-black items-center pt-5 gap-4">
        <Text
          style={globalFonts.leagueSpartanRegular}
          className="text-white p-5 text-center"
        >
          By continuing, you agree to{'\n'}
          <Text className="text-limegreen">Terms of Use</Text> and{' '}
          <Text className="text-limegreen">Privacy Policy.</Text>
        </Text>

        <Button
          onPress={handleSubmit(handleRegister)}
          className="bg-blacksecundary"
        >
          {loadingRegister ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text>Sign Up</Text>
          )}
        </Button>
      </View>
    </>
  )
}
