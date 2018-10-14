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

  id: number;
  name: string;
  type: string;
  full_text: string;

  constructor(monster) {
    console.log('Hello Monster Component');
    this.id = monster.id;
    this.name = monster.name;
    this.type = monster.type;
    this.full_text = monster.full_text;
  }

}
