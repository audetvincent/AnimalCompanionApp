import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from "ionic-angular";
import { Monster } from '../monster/monster';
/**
 * Generated class for the MonsterModal component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'monster-modal',
  templateUrl: 'monster-modal.html'
})
export class MonsterModal{
  monster;
  monsterHtml;

  constructor(public platform: Platform, public viewController: ViewController, public params: NavParams) {
    console.log('Hello MonsterModal Component');
    this.monster = params.get('monster').text;
  }

  ionViewDidLoad() {
    this.monsterHtml = document.createElement('div');
    this.monsterHtml.innerHtml = this.monster.full_text;
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
