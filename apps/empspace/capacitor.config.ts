import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartsoftware.empspace',
  appName: 'empspace',
  webDir: '../../dist/apps/empspace/',
  loggingBehavior: 'none',
    server: {
        cleartext: true,
        androidScheme: 'http'
    }
};

export default config;
