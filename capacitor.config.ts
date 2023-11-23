import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'demo.app',
  appName: 'demo-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
