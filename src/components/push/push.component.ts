import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';

import { environment } from '../../environments/environment';

@Component({
  selector: 'push',
  template: 'push.component.html',
})
export class PushComponent {

  constructor(private push: OneSignal)  {
      this.initPush();
  }

  initPush() {
      this.push.startInit(environment.googleAppID, environment.GoogleProjNumber);

      this.push.inFocusDisplaying(this.push.OSInFocusDisplayOption.Notification);

      this.push.handleNotificationReceived()
      .subscribe(() => {
        console.log("Notification received.");
      })

      this.push.handleNotificationOpened()
      .subscribe(() => {
        console.log("Notification opened.");
      })

      this.push.enableSound(true);
      this.push.enableVibrate(true);

      this.push.endInit();

  }

}
