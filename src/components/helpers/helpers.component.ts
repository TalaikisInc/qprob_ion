import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'helpers',
  templateUrl: 'helpers.component.html',
})
export class HelpersComponent {

  constructor(private alertCtrl: AlertController) {
  }

  alert(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}