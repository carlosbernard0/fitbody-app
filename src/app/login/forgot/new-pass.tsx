import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { globalFonts } from '@/styles/globalFonts'
import { sleep } from '@/utils/sleep'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { ChevronLeftIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

type NewPassData = z.infer<typeof newPassSchema>

const newPassSchema = z
  .object({
    password: z.string().min(6, 'The password can 6 caracters for continue'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "The passwords don't match",
    path: ['confirmPassword'],
  })

export default function NewPass() {
  const [loadingNewPass, setLoadingNewPass] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassData>({
    resolver: zodResolver(newPassSchema),
  })

  const handleNewPass = async (data: NewPassData) => {
    setLoadingNewPass(true)

    await sleep(2000)

    setLoadingNewPass(false)
    router.push('/login/fingerprint')
  }

  return (
    <SafeAreaView className="flex-1 bg-black gap-5">
      <View className="flex-[.1] items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5"
        >
          <ChevronLeftIcon color={'#E2F163'} />
        </TouchableOpacity>
        <Text style={globalFonts.poppinsBold} className="text-limegreen">
          Set Password
        </Text>
      </View>
      <View className="flex-[.1] justify-center">
        <Text
          style={globalFonts.leagueSpartanRegular}
          className="text-white p-4 text-center"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View className="flex-[.8] ">
        <View className="min-h-32 py-4 bg-lightpurple items-center justify-center">
          <View className="w-2/3 gap-2 pt-4">
            <Text className="text-lg font-bold">Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="******"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
          <View className="w-2/3 gap-2 py-4">
            <Text className="text-lg font-bold">Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="******"
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
        <View className="bg-black items-center pt-10">
          <Button
            onPress={handleSubmit(handleNewPass)}
            className="bg-blacksecundary"
          >
            {loadingNewPass ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text>Reset Password</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
