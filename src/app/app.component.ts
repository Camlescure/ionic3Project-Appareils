import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  optionsPage:any = OptionsPage;
  authPage:any = AuthPage;
  @ViewChild('content') content: NavController;

  isAuth: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
                platform.ready().then(() => {
                  statusBar.styleDefault();
                  splashScreen.hide();
                  let config = {
                    apiKey: "AIzaSyBaeAA9l0ZyQPgrChDXpHazYXQArhAyYXE",
                    authDomain: "ionicproject-754ba.firebaseapp.com",
                    databaseURL: "https://ionicproject-754ba.firebaseio.com",
                    projectId: "ionicproject-754ba",
                    storageBucket: "",
                    messagingSenderId: "225951650549"
                  };
                  firebase.initializeApp(config);
                  firebase.auth().onAuthStateChanged(
                    (user) => {
                      if (user) {
                        this.isAuth = true;
                        this.content.setRoot(TabsPage);
                      } else {
                        this.isAuth = false;
                        this.content.setRoot(AuthPage, {mode: 'connect'});
                      }
                    }
                  );
                });  
              }

  onDisconnect(){
    firebase.auth().signOut();
    this.menuCtrl.close();
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }
}
