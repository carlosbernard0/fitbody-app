import { globalFonts } from '@/styles/globalFonts'
import { sleep } from '@/utils/sleep'
import { router } from 'expo-router'
import { ChevronLeftIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormRegister } from './form-register'
import type { FormRegisterData } from './register-schema'

export default function Register() {
  const [loadingRegister, setLoadingRegister] = useState(false)

  const handleRegister = async (data: FormRegisterData) => {
    setLoadingRegister(true)
    console.log(data)

    await sleep(2000)

    setLoadingRegister(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-black gap-5">
      <View className="items-center flex-[.05] ">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5"
        >
          <ChevronLeftIcon color={'#E2F163'} />
        </TouchableOpacity>
        <Text style={globalFonts.poppinsBold} className="text-limegreen">
          Create Account
        </Text>
      </View>
      <View className="flex-[.05] items-center ">
        <Text style={globalFonts.poppinsBold} className="text-white">
          Let's start!
        </Text>
      </View>

      <View className="flex-[.7] justify-center">
        <FormRegister
          handleRegister={handleRegister}
          loadingRegister={loadingRegister}
        />
      </View>

      <View className="flex-[.2] items-center justify-center gap-5">
        <View className="gap-5 items-center ">
          <Text className="text-white">or sign up with</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity>
              <Image source={require('@/assets/icons/Google-Icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('@/assets/icons/Facebook-Icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('@/assets/icons/Fingerprint-Icon.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white">
          Already have an account?{' '}
          <Text
            onPress={() => router.push('/login')}
            className="text-limegreen underline"
          >
            Log in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}
