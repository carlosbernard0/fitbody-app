import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { globalFonts } from '@/styles/globalFonts'

function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text style={globalFonts.poppinsMedium}>Hello Template</Text>
      <Text style={globalFonts.leagueSpartanMedium}>is okay baby</Text>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text>go to login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
