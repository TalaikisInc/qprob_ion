import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { QProb } from './app.component';
import { ApiProvider } from '../providers/api/api';
import { AdsProvider } from '../providers/ads/ads';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HelpersComponent } from '../components/helpers/helpers.component';
import { AdMob } from '@ionic-native/admob';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';

@NgModule({
  declarations: [
    QProb,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(QProb),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    QProb,
  ],
  providers: [
    AdMob,
    AdsProvider,
    StatusBar,
    SplashScreen,
    SocialSharing,
    ApiProvider,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    TextToSpeech,
    OneSignal,
    SpeechRecognition,
    ScreenOrientation,
    HelpersComponent,
    Network,
    NetworkProvider,
    DatabaseProvider,
  ]
})
export class AppModule {}
