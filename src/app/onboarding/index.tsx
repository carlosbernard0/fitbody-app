import { globalFonts } from '@/styles/globalFonts'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import type { ICarouselInstance } from 'react-native-reanimated-carousel'

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

export default function Onboarding() {
  const progress = useSharedValue<number>(0)
  const ref = React.useRef<ICarouselInstance>(null)

  const onPressPagination = (index: number) => {
    if (index === 3) {
      router.navigate('/login')
    } else {
      ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      })
    }
  }

  return (
    <View
      className="flex-1 items-center justify-center"
      id="carousel-component"
    >
      <Carousel
        ref={ref}
        width={width}
        height={height}
        autoPlayInterval={2000}
        loop={false}
        data={onboardingScreens}
        snapEnabled={true}
        onProgressChange={progress}
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
            {item.step !== 3 && (
              <View className=" absolute top-14 right-5">
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-limegreen text-lg">Skip</Text>
                  <ChevronRight color="#E2F163" size={20} />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{ width }}
              className="h-48 bg-lightpurple items-center p-6"
            >
              <Image source={item.icon} tintColor={'#E2F163'} />
              <Text
                className="flex-1 p-2 text-center text-white"
                style={globalFonts.poppinsBold}
              >
                {item.text}
              </Text>
              <StepVisualize step={item.step} />
            </View>
            <BlurView
              intensity={50}
              tint="dark"
              style={{ borderRadius: 24 }}
              className="absolute bottom-64 justify-center items-center overflow-hidden"
            >
              <TouchableOpacity
                onPress={() => onPressPagination(item.step)}
                className="p-3 w-[200px]  border-white border-2 rounded-3xl"
              >
                <Text
                  style={globalFonts.poppinsBold}
                  className="text-white text-center"
                >
                  {item.step !== 3 ? 'Next' : 'Get Started'}
                </Text>
              </TouchableOpacity>
            </BlurView>
          </ImageBackground>
        )}
      />
    </View>
  )
}

interface StepVisualizeProps {
  step: number
}

const StepVisualize = ({ step }: StepVisualizeProps) => {
  return (
    <View className="flex-row gap-2 items-center">
      <Text
        className={`${step === 1 ? 'text-white bg-white' : 'text-purple bg-purple'} w-8 h-2 rounded-xl`}
      >
        -
      </Text>
      <Text
        className={`${step === 2 ? 'text-white bg-white' : 'text-purple bg-purple'} w-8 h-2 rounded-xl`}
      >
        -
      </Text>
      <Text
        className={`${step === 3 ? 'text-white bg-white' : 'text-purple bg-purple'} w-8 h-2 rounded-xl`}
      >
        -
      </Text>
    </View>
  )
}
