import {
    AdMob,
    AdMobBannerSize,
    AdmobConsentStatus,
    BannerAdOptions,
    BannerAdPluginEvents, BannerAdPosition, BannerAdSize
} from '@capacitor-community/admob';

export async function initialize(): Promise<void> {
    async function banner(): Promise<void> {
        await AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
            // Subscribe Banner Event Listener
        });

        await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
            // Subscribe Change Banner Size
        });

        const options: BannerAdOptions = {
            adId:'ca-app-pub-8350344729252908/7124743448',
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: true
        // npa: true
        };
        await AdMob.showBanner(options);
    }


    await AdMob.initialize();

    const [trackingInfo, consentInfo ] = await Promise.all([
        AdMob.trackingAuthorizationStatus(),
        AdMob.requestConsentInfo(),
        banner()
    ]);

    if (trackingInfo.status === 'notDetermined') {
        /**
         * If you want to explain TrackingAuthorization before showing the iOS dialog,
         * you can show the modal here.
         * ex)
         * const modal = await this.modalCtrl.create({
         *   component: RequestTrackingPage,
         * });
         * await modal.present();
         * await modal.onDidDismiss();  // Wait for close modal
         **/

        await AdMob.requestTrackingAuthorization();
    }

    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
        authorizationStatus.status === 'authorized' &&
        consentInfo.isConsentFormAvailable &&
        consentInfo.status === AdmobConsentStatus.REQUIRED) {
        await AdMob.showConsentForm();
    }
}
