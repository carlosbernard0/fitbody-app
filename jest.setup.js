import '@testing-library/jest-native/extend-expect'

// Mock do NativeWind
jest.mock('nativewind', () => ({
  styled: jest.fn(component => component),
  useColorScheme: jest.fn(() => 'light'),
}))

// Mock do expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}))

// Mock do expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}))

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  Eye: 'Eye',
  EyeOff: 'EyeOff',
}))

// Mock do react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: 'GestureHandlerRootView',
}))

// Mock do react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: 'SafeAreaProvider',
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}))

// Mock do expo-local-authentication
jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(),
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
}))

// Mock do expo-font
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]),
}))

// Mock do @expo-google-fonts
jest.mock('@expo-google-fonts/poppins', () => ({
  useFonts: jest.fn(() => [true]),
  Poppins_400Regular: 'Poppins_400Regular',
  Poppins_500Medium: 'Poppins_500Medium',
  Poppins_700Bold: 'Poppins_700Bold',
  Poppins_900Black: 'Poppins_900Black',
}))

jest.mock('@expo-google-fonts/league-spartan', () => ({
  useFonts: jest.fn(() => [true]),
  LeagueSpartan_400Regular: 'LeagueSpartan_400Regular',
  LeagueSpartan_500Medium: 'LeagueSpartan_500Medium',
  LeagueSpartan_700Bold: 'LeagueSpartan_700Bold',
  LeagueSpartan_900Black: 'LeagueSpartan_900Black',
}))

// Mock do tailwind-merge
jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn((...classes) => classes.join(' ')),
}))

// Mock do react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn(fn => fn),
    formState: { errors: {} },
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    register: jest.fn(),
    unregister: jest.fn(),
    clearErrors: jest.fn(),
    setError: jest.fn(),
  })),
}))

// Mock do zustand (se usado no futuro) - removido pois não está instalado

// Configuração global para console.warn
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}
