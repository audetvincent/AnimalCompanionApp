import { Component } from '@angular/core';

/**
 * Generated class for the Monster component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'monster',
  templateUrl: 'monster.html'
})
export class Monster {

  text: string;

  constructor() {
    console.log('Hello Monster Component');
    this.text = 'Hello World';
  }

}
