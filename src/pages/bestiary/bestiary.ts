import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import { Monster } from '../../components/monster/monster';

/**
 * Generated class for the BestiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bestiary',
  templateUrl: 'bestiary.html',
})
export class BestiaryPage {
  monsters: any;

  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider, public modalController: ModalController) {
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if(ready) {
        this.loadMonsterData();
      }
    })
  }

  loadMonsterData() {
    this.databaseProvider.getAllMonster().then(data => {
      this.monsters = data;
      console.log('Monster loaded');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestiaryPage');
  }

  displayMonster(m) {
    const monster = new Monster(m);
    const modal = this.modalController.create(monster);
    modal.present();
  }

}
