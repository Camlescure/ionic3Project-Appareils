import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { Appareil } from '../../models/appareil';
import { AppareilsService } from '../../services/appareils.service';
import {SingleAppareilPage} from "../single-appareil/single-appareil";
import { MenuController } from 'ionic-angular';
import {AppareilFormPage} from "./appareil-form/appareil-form";

@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html'
})
export class AppareilsPage {

  appareilsList: Appareil[];

  constructor(private modalCtrl: ModalController,
              private appareilsService: AppareilsService,
              private menuCtrl: MenuController,
              private navCtrl: NavController) {}

 ionViewWillEnter(){
    this.appareilsList = this.appareilsService.appareilsList.slice();
 }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onLoadAppareil(index: number) {
    let modal = this.modalCtrl.create(SingleAppareilPage, {index: index});
    modal.present();
  }

  onNewAppareil() {
    this.navCtrl.push(AppareilFormPage);
  }
}
