import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  characters: Array<{id: number, name: string}>

  constructor(public navCtrl: NavController) {
    this.characters = [];

  }

  create() {
    this.characters.push({ id: 1, name: 'something' });
    this.navCtrl.push('CharacterPage');
  }

  settings() {

  }

}
