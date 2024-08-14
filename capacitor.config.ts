import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'smart.software.erp',
    appName: 'SmartERP',
    webDir: 'dist/apps/erp',
    loggingBehavior: 'debug',
    server: {
        cleartext: true,
        androidScheme: 'http'
    }
};

export default config;
