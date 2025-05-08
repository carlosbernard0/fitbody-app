import { globalFonts } from '@/styles/globalFonts'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text style={globalFonts.poppinsMedium}>Hello Template</Text>
      <Text style={globalFonts.leagueSpartanMedium}>is okay baby</Text>
      <TouchableOpacity onPress={() => router.push('/onboarding')}>
        <Text>go to onboarding</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
