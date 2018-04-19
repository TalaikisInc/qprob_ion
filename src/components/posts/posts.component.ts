import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
import { Post } from '../../models/post.interface';
import { environment } from '../../environments/environment';
import { HelpersComponent } from '../../components/helpers/helpers.component';

@Component({
  selector: 'posts',
  templateUrl: 'posts.component.html',
  styles: [
    '.sentUp {background-color: #80CBC4}',
    '.sentDn {background-color: #FFAB91}'],
})
export class PostsComponent {

  @Input() post: Post
  target: string
  options: string
  categoryTitle: string
  speech: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;
  iapOptions: string
  iapTarget: string
  baseUrl: string

  constructor(private platform: Platform, private navCtrl: NavController, private iab: InAppBrowser, private tts: TextToSpeech, private speechRecog: SpeechRecognition, private helpers: HelpersComponent) {
  this.baseUrl = "https://" + environment.host + "/"
    //setInterval(_ => {
    //this.speech = this.speech;
    //}, 5000);
  }

  openURL(url: string) {
    this.iapOptions = environment.iapOptions;
    this.iapTarget = environment.iapTarget;
    this.iab.create(url, this.iapTarget, this.iapOptions);
  }

  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speechRecog.isRecognitionAvailable();
    console.log("Is speech recognition available ", isAvailable);
    return isAvailable;
  }

  async getPermission(): Promise<void> {
    try {
      let permission = await this.speechRecog.requestPermission();
      console.log("Speech recognition permission ", permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speechRecog.hasPermission();
      console.log("Speech recognition has permission ", permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speechRecog.getSupportedLanguages();
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }

  speechDialog(speech: string) {
    if (speech != undefined) {
      // say anything and get next post read
      // that's the idea, but dropped for future
      //this.alert("heard next");
      // 1. find where is current
      // 2. select next if enough text
      // 3. speak
      this.helpers.alert("Yep", "You did it");
    }
  }

  // TODO also should chekc for supported languages
  listen(): void {
    if (this.isSpeechSupported()) {
      this.androidOptions = {
        prompt: 'Waiting for your command, master!'
      }

      this.iosOptions = {
        language: 'en-US'
      }

      if (this.hasPermission()) {
        if (this.platform.is('android')) {
          this.speechRecog.startListening(this.androidOptions).subscribe(data => this.speech = data, error => console.log(error));
          this.speechDialog(this.speech[0]);
        }
        else if (this.platform.is('ios')) {
          this.speechRecog.startListening(this.iosOptions).subscribe(data => this.speech = data, error => console.log(error));
          this.speechDialog(this.speech[0]);
        }
      } else {
        this.getPermission();
      }
    }
  }

  async speakPost(title: string, text: string): Promise<any> {
    try {
      if (text.length > environment.minSpeakText) {
        await this.tts.speak(title + ". " + text);
        // idea is to enable listening after post is read
        // dropped for future improvements
        //this.listen();
      } else {
        this.helpers.alert("I'm sorry, master!", "Not enough text here to launch my voice.");
      }
    }
    catch (e) {
      console.log(e);
      if (environment.liveDebug) {
        this.helpers.alert("Post speak debug", e);
      }
    }
  }

  goToPostsByCat(slug: string, title: string): void {
    this.navCtrl.push('PostByCatPage', {
      "categorySlug": slug,
      "categoryTitle": title,
    })
  }

  toPost(postSlug: string): void {
    this.navCtrl.push('PostPage', {
      "postSlug": postSlug,
    })
  }

}
