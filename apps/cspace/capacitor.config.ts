import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'smart.software.com',
  appName: 'cspace',
  webDir: '../../dist/apps/cspace/',
  loggingBehavior: 'none',
    server: {
        cleartext: true,
        androidScheme: 'http'
    }
};

export default config;
