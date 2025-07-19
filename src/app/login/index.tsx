import { router, usePathname } from 'expo-router'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalFonts } from '@/styles/globalFonts'
import { sleep } from '@/utils/sleep'
import { FormLogin } from './form-login'
import type { FormLoginData } from './login-schema'

export default function Login() {
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
  const _pathname = usePathname()

  const handleLogin = async (data: FormLoginData) => {
    setLoadingLogin(true)

    console.log(data)

    await sleep(2000)

    setLoadingLogin(false)
  }

  return (
    <SafeAreaView className=" flex-1 bg-black">
      <View className="items-center flex-[.1]">
        <Text style={globalFonts.poppinsBold} className="text-limegreen">
          Log In
        </Text>
      </View>
      <View className="items-center gap-3 flex-[.2]">
        <Text style={globalFonts.poppinsBold} className="text-white">
          Welcome
        </Text>
        <Text
          style={globalFonts.leagueSpartanRegular}
          className="text-white p-8 text-center"
        >
          Lorem ipsum dolor sit amet, sdsadasda adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.{' '}
        </Text>
      </View>
      <View className="flex-[.5] justify-center">
        <FormLogin handleLogin={handleLogin} loadingLogin={loadingLogin} />
      </View>
      <View className="flex-[.2] items-center justify-center gap-14">
        <View className="gap-5 items-center ">
          <Text className="text-white">or log in with</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity>
              <Image source={require('@/assets/icons/Google-Icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('@/assets/icons/Facebook-Icon.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white">
          Don’t have an account?{' '}
          <Text
            onPress={() => router.push('/register')}
            className="text-limegreen underline"
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}
