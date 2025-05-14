import { Stack } from 'expo-router'
import '@/styles/global.css'
import {
  LeagueSpartan_400Regular,
  LeagueSpartan_500Medium,
  LeagueSpartan_700Bold,
  LeagueSpartan_900Black,
  useFonts as useLeagueSpartan,
} from '@expo-google-fonts/league-spartan'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts as usePoppins,
} from '@expo-google-fonts/poppins'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from './onboarding/welcome-splash'

export default function Layout() {
  const [splashDone, setSplashDone] = useState(false)
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  })
  const [spartanLoaded] = useLeagueSpartan({
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_700Bold,
    LeagueSpartan_900Black,
  })

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!poppinsLoaded || !spartanLoaded || !splashDone) return <SplashScreen />

  return (
    <SafeAreaProvider className="flex-1">
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
