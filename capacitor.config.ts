import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6a44b4eaa44940d3b6890c8e6f5c9876',
  appName: 'ma-tirelire-journaliere',
  webDir: 'dist',
  server: {
    url: 'https://6a44b4ea-a449-40d3-b689-0c8e6f5c9876.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: false
    }
  }
};

export default config;