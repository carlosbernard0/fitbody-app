import * as LocalAuthentication from 'expo-local-authentication'
import { router } from 'expo-router'
import { ChevronLeftIcon, Fingerprint } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/button'
import { globalFonts } from '@/styles/globalFonts'

export default function FingerprintScreen() {
  const [_isAuthenticated, setIsAuthenticated] = useState(false)

  const verifyAvailableAuthentication = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()

    if (!compatible) {
      return goToSetUp()
    }

    //Busca os tipos de autenticacao que o dispositivo fornece -- 1 = Fingerprint
    // const typesAvailbleList = await LocalAuthentication.supportedAuthenticationTypesAsync()
  }

  const handleAuthentication = async () => {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!isBiometricEnrolled) {
      return Alert.alert('Error', 'Fingerprint is not defined!')
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Fingerprint',
      fallbackLabel: 'Fingerprint is not recognize',
    })

    setIsAuthenticated(auth.success)
    goToSetUp()
  }

  const goToSetUp = () => {
    router.navigate('/setup')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-black gap-6">
      <View className="flex-[.1] items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5"
        >
          <ChevronLeftIcon color={'#E2F163'} />
        </TouchableOpacity>
        <Text style={globalFonts.poppinsBold} className="text-limegreen">
          Set Your Fingerprint
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
      <View className="flex-[.4]">
        <View className="min-h-80 py-4 bg-lightpurple items-center justify-center">
          <Fingerprint height={279} width={102} color="#FFF" />
        </View>
      </View>
      <View className="flex-[.4] gap-4 items-center pt-6 ">
        <Button className="bg-blacksecundary" onPress={() => goToSetUp()}>
          <Text>Skip</Text>
        </Button>
        <Button className="bg-blacksecundary" onPress={handleAuthentication}>
          <Text>Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
