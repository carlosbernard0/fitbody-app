import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { globalFonts } from '@/styles/globalFonts'
import { sleep } from '@/utils/sleep'
import { zodResolver } from '@hookform/resolvers/zod'
import { router, usePathname } from 'expo-router'
import { ChevronLeftIcon, User } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

type ForgotData = z.infer<typeof forgotSchema>

const forgotSchema = z.object({
  email: z.string().email('Digite um email válido!'),
})

export default function ForgotPass() {
  const pathname = usePathname()
  const [loadingForgot, setLoadingForgot] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotData>({
    resolver: zodResolver(forgotSchema),
  })

  const handleForgot = async (data: ForgotData) => {
    setLoadingForgot(true)

    await sleep(2000)

    setLoadingForgot(false)
    router.push(`${pathname}/new-pass`)
  }
  return (
    <SafeAreaView className="flex-1 bg-black gap-5">
      <View className="items-center flex-[.1] ">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5"
        >
          <ChevronLeftIcon color={'#E2F163'} />
        </TouchableOpacity>
        <Text style={globalFonts.poppinsBold} className="text-limegreen">
          Forgotten Password
        </Text>
      </View>
      <View className="flex-[.3] items-center justify-center ">
        <Text style={globalFonts.poppinsBold} className="text-white">
          Forgot Password?
        </Text>
        <Text
          className="text-white text-center p-6"
          style={globalFonts.leagueSpartanRegular}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <View className="flex-[.6]">
        <View className="min-h-32 py-4 bg-lightpurple items-center justify-center">
          <View className="w-2/3 gap-2">
            <Text className="text-lg font-bold">Enter your email address</Text>
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
        </View>
        <View className="bg-black items-center pt-10">
          <Button
            onPress={handleSubmit(handleForgot)}
            className="bg-blacksecundary"
          >
            {loadingForgot ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text>Continue</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
