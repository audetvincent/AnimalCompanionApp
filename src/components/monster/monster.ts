
export class MonsterFactory {
  createMonster(type: Object);
  createMonster(type: 'Animal'): Animal;


  public createMonster(monsterInfo): Monster {
    if(monsterInfo.type === "Animal") {
      const animal = new Animal(monsterInfo.name, monsterInfo.hitDice, monsterInfo.abilities, monsterInfo.size, monsterInfo.natArmor);
      return animal;
    }
  };
}

export abstract class Monster {
  name: String = "";
  hitDice: HitDice;
  abilities: Abilities;
  saves: Saves;
  bab: BaseAttackBonus;
  size: Size;
  ac: ArmorClass;

  constructor(name: String, hitDice: number, abilityScores: number[], size: string) {
    this.name = name;
    this.abilities = new Abilities(abilityScores);
    this.size = new Size(size);
  }

  setHitDice(quantity: number, conMod: number, type: number, baseBonus: number = 0) {
    this.hitDice = new HitDice(quantity, conMod, type, baseBonus);
  };
  abstract setSaves(level: number, abilities: Abilities);
  abstract setBAB(level: number);
}

class Animal extends Monster {
  constructor(name: string, hitDice: number, abilityScore: number[], size: string, natArmor: number) {
    super(name, hitDice, abilityScore, size);

    this.ac = new ArmorClass(natArmor, this.abilities.dex.modifier, this.size.modifier)

    this.setHitDice(hitDice, this.abilities.con.modifier, 8);
    this.setSaves(hitDice, this.abilities);
    this.setBAB(hitDice);
  }

  setSaves(level: number, abilities: Abilities) {
    this.saves = new AnimalSaves(level, abilities);
  }

  setBAB(level: number) {
    this.bab = new AnimalBAB(level);
  }
}

class Abilities {
  str: { score: number, modifier: number };
  dex: { score: number, modifier: number };
  con: { score: number, modifier: number };
  int: { score: number, modifier: number };
  wis: { score: number, modifier: number };
  cha: { score: number, modifier: number };

  constructor(scores: number[]) {
    if(scores.length !== 5) {
      throw "Invalid number of ability score";
    }
    this.str = { score: scores[0], modifier: (scores[0] - 10) / 2 };
    this.dex = { score: scores[1], modifier: (scores[1] - 10) / 2 };
    this.con = { score: scores[2], modifier: (scores[2] - 10) / 2 };
    this.int = { score: scores[3], modifier: (scores[3] - 10) / 2 };
    this.wis = { score: scores[4], modifier: (scores[4] - 10) / 2 };
    this.cha = { score: scores[5], modifier: (scores[5] - 10) / 2 };
  }
}

interface Dice {
  quantity: number;
  type: number;
  bonus: number;
  baseBonus: number;
  toString();
}

class HitDice implements Dice{
  quantity: number;
  type: number;
  bonus: number;
  baseBonus: number;
  mean: number;

  constructor(quantity: number, conMod: number, type: number, baseBonus = 0) {
    this.quantity = quantity;
    this.type = type;
    this.bonus = conMod * quantity;
    this.baseBonus = baseBonus;

    this.mean = ((this.quantity + this.type)/2 * this.quantity) + this.bonus + this.baseBonus;
  }

  toString() {
    let bonus = this.bonus + this.baseBonus;
    if(bonus > 0){
      return `${this.quantity}d${this.type}+${bonus} (${this.mean})`;
    }
    // it should but the '-' automaticaly since it is negative
    return `${this.quantity}d${this.type}${bonus} (${this.mean})`;
  }
}

abstract class Saves {
  fort: { base: number, bonus: number };
  ref: { base: number, bonus: number };
  will: { base: number, bonus: number };

  constructor(level: number, abilities: Abilities) {}
}

class AnimalSaves extends Saves {
  constructor(level: number, abilities: Abilities) {
    super(level, abilities);
    const high = Math.floor(level/2)+2;
    const low = Math.floor(level/3);

    this.fort = { base: high, bonus: abilities.con.modifier };
    this.ref = { base: high, bonus: abilities.dex.modifier };
    this.will = { base: low, bonus: abilities.wis.modifier };
  }
}

abstract class BaseAttackBonus {
  constructor(level: number) {};
}

class AnimalBAB  {
  constructor(level: number){
    let babArray = Array<number>();
    let bab = Math.floor(level * 0.75);
    while(bab > 5) {
      babArray.push(bab);
      bab -= 5;
    }
    return babArray;
  }
}

class Size {
  modifier: number;
  specialModifier: number;
  hideModifier: number;

  constructor(size: string) {
    const value = sizeTable[size];

    this.modifier = value * -2;
    this.specialModifier = value * 4;
    this.hideModifier = value * -4;
  }
}

interface Sizing {
  readonly [key: string]: number
}

const sizeTable: Sizing = {
  diminutive: -4,
  fine : -3,
  tiny : -2,
  small : -1,
  medium : 0,
  large : 1,
  huge : 2,
  gargantuan : 3,
  colossal : 4
}

class ArmorClass {
  full: number;
  touch: number;
  flatFoot: number;

  constructor(natArmor: number, dexMod: number, sizeMod: number, armor: number = 0, shield: number = 0, enhancement: number = 0, deflection: number = 0, dodge: number = 0) {
    const baseAC = sizeMod + deflection;
    const baseTouch = dexMod + dodge;
    const baseFlatFoot = natArmor + armor + shield + enhancement;

    this.full = baseAC + baseTouch + baseFlatFoot;
    this.touch = baseAC + baseTouch;
    this.flatFoot = baseAC + baseFlatFoot;
  }
}

  // text: {
  //   id,
  //   family,
  //   name,
  //   altname,
  //   size,
  //   type,
  //   descriptor,
  //   hit_dice,
  //   initiative,
  //   speed,
  //   armor_class,
  //   base_attack,
  //   grapple,
  //   attack,
  //   full_attack,
  //   space,
  //   reach,
  //   special_attacks,
  //   special_qualities,
  //   saves,
  //   abilities,
  //   skills,
  //   bonus_feats,
  //   feats,
  //   epic_feats,
  //   environment,
  //   organization,
  //   challenge_rating,
  //   treasure,
  //   alignment,
  //   advancement,
  //   level_adjustment,
  //   special_abilities,
  //   stat_block,
  //   full_text,
  //   reference
  // }

  // stats: {
  //   id: number,
  //   family: string,
  //   name: string,
  //   altname: string,
  //   size: string,
  //   type: string,
  //   descriptor: string,
  //   hit_dice: Dice,
  //   initiative: number,
  //   speed: string,
  //   armor_class: { ac: number, touch: number, flat: number = () => { return 123; } },
  //   base_attack: number,
  //   grapple: number,
  //   attack: number,
  //   full_attack,
  //   space: number,
  //   reach: number,
  //   saves: { fort: number, ref: number, will: number },
  //   abilities: Abilities,
  //   abilities_modifier: Abilities,
  //   skills,
  //   bonus_feats,
  //   feats,
  //   epic_feats,
  //   environment,
  //   organization,
  //   challenge_rating,
  //   treasure,
  //   alignment,
  //   advancement,
  //   level_adjustment,
  //   special_abilities,
  //   stat_block,
  //   full_text: string,
  //   reference
  // }

  // constructor(monster) {
  //   console.log('Hello Monster Component');
  //   this.text = monster;
  // }

  // extractStatsFromText() {
  //   this.extractAbilities(this.text.abilities);

  // }

  // extractAbilities(abilitiesString: string) {
  //   let abilities = abilitiesString.split(',');
  //   abilities.forEach((ability, i) => {
  //     let value = ability.search(/\d[0-9]/g);

  //     if(i == 0) {
  //       this.stats.abilities.str = value;
  //     } else if(i == 1) {
  //       this.stats.abilities.dex = value;
  //     } else if(i == 2) {
  //       this.stats.abilities.con = value;
  //     } else if(i == 3) {
  //       this.stats.abilities.int = value;
  //     } else if(i == 4) {
  //       this.stats.abilities.wis = value;
  //     } else if(i == 5) {
  //       this.stats.abilities.cha = value;
  //     }
  //   });

  //   this.setAbilitiesModifier();
  // }

  // setAbilitiesModifier() {
  //   this.stats.abilities_modifier.str = (this.stats.abilities.str - 10)%2;
  //   this.stats.abilities_modifier.dex = (this.stats.abilities.dex - 10)%2;
  //   this.stats.abilities_modifier.con = (this.stats.abilities.con - 10)%2;
  //   this.stats.abilities_modifier.int = (this.stats.abilities.int - 10)%2;
  //   this.stats.abilities_modifier.wis = (this.stats.abilities.wis - 10)%2;
  //   this.stats.abilities_modifier.cha = (this.stats.abilities.cha - 10)%2;
  // }

  // extractHitDice(hitDiceString: string) {
  //   let splitHitDice = hitDiceString.split(/\s|d|\+/g)
  //   let dice: Dice;
  //   if (splitHitDice.length >= 2) {
  //     dice.quantity = Number(splitHitDice[0]);
  //     dice.value = Number(splitHitDice[1]);
  //     dice.baseBonus = 0;
  //     dice.bonus = 0;
  //   } if (splitHitDice.length > 3) {
  //     dice.baseBonus = Number(splitHitDice[2]) - ( Number(splitHitDice[0]) * this.stats.abilities_modifier.con),
  //     dice.bonus = Number(splitHitDice[2])
  //   }

  //   this.stats.hit_dice = dice;
  // }

  // setBaseAttack() {
  //   this.stats.base_attack = BaseAttackBonus.getBAB(this.stats.hit_dice.quantity);
  // }

  // setSaves() {
  //   this.stats.saves.fort =
  // }
