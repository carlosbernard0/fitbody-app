import { globalFonts } from '@/styles/globalFonts'
import { Image, ImageBackground, Text, View } from 'react-native'

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/woman-training-workout-gym.png')}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 items-center justify-center gap-4">
        <Text style={globalFonts.leagueSpartanBold} className="text-limegreen">
          Welcome to
        </Text>
        <Image source={require('@/assets/images/fb-logo.png')} />
        <Image source={require('@/assets/images/fb-letreiro.png')} />
      </View>
    </ImageBackground>
  )
}
