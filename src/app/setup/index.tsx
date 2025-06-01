import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Setup() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className=" items-center justify-center">
        <Text>Set Up</Text>
      </View>
    </SafeAreaView>
  )
}
