import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';


export class AdmobClass {
    static async initialize(): Promise<void> {
        AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
            initializeForTesting: true,
        });
    }

    static async banner(): Promise<void> {
        AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
            // Subscribe Banner Event Listener
        });

        AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
            // Subscribe Change Banner Size
        });

        const options: BannerAdOptions = {
            adId: 'ca-app-pub-3388839794730339/2242445689',
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: false
            // npa: true
        };
        AdMob.showBanner(options);
    }

}
