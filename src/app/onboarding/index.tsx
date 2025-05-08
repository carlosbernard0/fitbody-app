import { globalFonts } from '@/styles/globalFonts'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

const onboardingScreens = [
  {
    step: 1,
    text: 'Start Your Journey Towards A More Active Lifestyle',
    background: require('@/assets/images/man-training-workout-gym.png'),
    icon: require('@/assets/icons/Work-Out.png'),
  },
  {
    step: 2,
    text: 'Find nutrition tips that fit your lifestyle',
    background: require('@/assets/images/young-woman.png'),
    icon: require('@/assets/icons/Nutrition.png'),
  },
  {
    step: 3,
    text: 'A community for you, challenge yourself',
    background: require('@/assets/images/man-training-workout-gym-2.png'),
    icon: require('@/assets/icons/Community.png'),
  },
]

const { width, height } = Dimensions.get('window')

export default function Welcome() {
  return (
    <View
      className="flex-1 items-center justify-center"
      id="carousel-component"
    >
      <Carousel
        width={width}
        height={height}
        autoPlayInterval={2000}
        loop={false}
        data={onboardingScreens}
        snapEnabled={true}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderItem={({ item }) => (
          <ImageBackground
            className="flex-1 items-center justify-center"
            source={item.background}
            resizeMode="cover"
          >
            <View
              style={{ width }}
              className="h-48 bg-lightpurple items-center p-2"
            >
              <Image source={item.icon} tintColor={'#E2F163'} />
              <Text
                className="flex-1 p-7 text-center text-white"
                style={globalFonts.poppinsBold}
              >
                {item.text}
              </Text>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  )
}
