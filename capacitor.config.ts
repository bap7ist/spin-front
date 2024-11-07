import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spin.app',
  appName: 'Spin',
  webDir: 'www',
  server: {
    iosScheme: 'ionic',
    cleartext: true,
    allowNavigation: [
      'https://spin-api-tjx5.onrender.com'
    ]
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    limitsNavigationsToAppBoundDomains: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    }
  }
};

export default config;
