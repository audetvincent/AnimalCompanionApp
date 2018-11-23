import { NgModule } from '@angular/core';
import { Feat } from './feat/feat';
import { Monster } from './monster/monster';
import { MonsterModal } from './monster-modal/monster-modal';

@NgModule({
	declarations: [
    Feat,
    Monster,
    MonsterModal
  ],
  imports: [],
	exports: [
    Feat,
    Monster,
    MonsterModal
  ]
})
export class ComponentsModule {}
