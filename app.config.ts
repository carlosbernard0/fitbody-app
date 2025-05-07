import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  scheme: 'fitbody-app',
  name: 'fitbody-app',
  slug: 'fitbody-app',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    icon: {
      dark: './src/assets/icons/ios-dark.png',
      light: './src/assets/icons/ios-light.png',
      tinted: './src/assets/icons/ios-tinted.png',
    },
  },
  android: {
    adaptiveIcon: {
      monochromeImage: './src/assets/images/splash-fitbody.png',
      backgroundImage: './src/assets/images/splash-fitbody.png',
      foregroundImage: './src/assets/images/splash-fitbody.png',
      backgroundColor: '#232323',
    },
    package: 'com.carlosbernardo',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/icons/fitbody-icon.png',
        backgroundColor: '#232323',
        imageWidth: 200,
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '47c3e09c-1b4c-4d08-b200-80fdbdfe315f',
    },
  },
})
