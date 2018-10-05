import { NgModule } from '@angular/core';
import { Feat } from './feat/feat';
import { Monster } from './monster/monster';
@NgModule({
	declarations: [Feat,
    Monster],
	imports: [],
	exports: [Feat,
    Monster]
})
export class ComponentsModule {}
