import { Component } from '@angular/core';

/**
 * Generated class for the Feat component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feat',
  templateUrl: 'feat.html'
})
export class Feat {
  id: number;
  name: string;
  type: string

  constructor() {
    console.log('Hello Feat Component');
  }

}
