import { Stack } from 'expo-router'
import '@/styles/global.css'
import {
  LeagueSpartan_400Regular,
  useFonts as useLeagueSpartan,
} from '@expo-google-fonts/league-spartan'
import {
  Poppins_700Bold,
  useFonts as usePoppins,
} from '@expo-google-fonts/poppins'
import React, { useEffect, useState } from 'react'
import SplashScreen from './onboarding/splash'

export default function Layout() {
  const [splashDone, setSplashDone] = useState(false)
  const [poppinsLoaded] = usePoppins({
    Poppins_700Bold,
  })
  const [spartanLoaded] = useLeagueSpartan({
    LeagueSpartan_400Regular,
  })

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!poppinsLoaded || !spartanLoaded || !splashDone) return <SplashScreen />

  return <Stack screenOptions={{ headerShown: false }} />
}
