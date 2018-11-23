import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import { MonsterFactory } from '../../components/monster/monster';
import { MonsterModal } from '../../components/monster-modal/monster-modal';

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
  monsters;
  monsterFactory: MonsterFactory;

  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider, public modalController: ModalController) {
    this.monsterFactory = new MonsterFactory();

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
    console.log('DISPLAY MONSTER');
    m = this.monsterStringToJson(m);
    const monster = this.monsterFactory.createMonster(m);
    const modal = this.modalController.create(MonsterModal, { monster });
    modal.present();
  }

  monsterStringToJson(monster) {
    return monster;
  }

}
