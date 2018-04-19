import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkProvider {

  connected: Subscription;
  disconnected: Subscription;

  constructor(public toast: ToastController, private net: Network) {
  }

  displayNetworkUpdate(connectionState: string) {
    //this intended only for disconnections
    this.toast.create({
      message: `You are now ${connectionState}, but your gin needs some magic internet elixir to wake up from death.`,
      duration: 10000
    }).present();
  }

  networkWatcher() {
    this.connected = this.net.onConnect().subscribe(data => {
      //TODO
      //process data to database
      //console.log(data)
      //this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.disconnected = this.net.onDisconnect().subscribe(data => {
      //console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

}
