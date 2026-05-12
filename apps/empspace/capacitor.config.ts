import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'smart.software.com',
  appName: 'empspace',
  webDir: '../../dist/apps/empspace/',
  loggingBehavior: 'none',
    server: {
        cleartext: true,
        androidScheme: 'http'
    }
};

export default config;
