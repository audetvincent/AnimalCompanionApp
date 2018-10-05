import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";

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

  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if(ready) {
        this.loadMonsterData();
      }
    })
  }

  loadMonsterData() {
    this.databaseProvider.getAllMonster().then(data => {
      this.monsters = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestiaryPage');
  }

}
