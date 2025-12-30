import { Injectable } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {
    AdMob.initialize({
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
  }

  showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-3388839794730339/2242445689',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true // Set to true for testing
    };
    AdMob.showBanner(options);
  }

  hideBanner() {
    AdMob.hideBanner();
  }
}
