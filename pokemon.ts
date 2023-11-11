console.clear();

const divider = (name: string = " "): void =>
  console.log(`\n-----${name}-----\n`);

class Attackskill {
  public attack: string;
  public damage: number;
  public magic: number;

  constructor(attack: string, damage: number, magic: number) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}

class Pokemon {
  public name: string;
  public health: number;
  public magic: number;
  public skills: Attackskill[];
  public counter: number;

  constructor(
    name: string,
    health: number,
    magic: number,
    skills: Attackskill[],
    counter: number
  ) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.skills = [];
    this.counter = counter;
  }

  learnAttackSkill(newskill: Attackskill): void {
    this.skills.push(newskill);
  }

  showStatus(): string {
    if (this.counter > 3) {
      return `${this.name} has health: ${this.health}, magic: ${this.magic} and is the winner`;
    } else {
      return `${this.name} has health: ${this.health}, magic: ${this.magic} and has lost`;
    }
  }
  getMagics(): void {
    const randomNumIncrease = Math.floor(Math.random() * 21);
    this.magic += randomNumIncrease;
  }

  hasEnoughMagic(skillName: string): boolean {
    const attackSkill = this.skills.find((skill) => skill.attack === skillName);
    if (attackSkill && this.magic > attackSkill.magic) {
      return true;
    } else {
      return false;
    }
  }

  isAlive(): boolean {
    if (this.health > 0) {
      return true;
    } else {
      return false;
    }
  }

  attack(skillName: string, opponent: Pokemon): void {
    const attackSkill = this.skills.find((skill) => skill.attack === skillName);
    if (
      this.isAlive() &&
      opponent.isAlive() &&
      attackSkill &&
      this.hasEnoughMagic(skillName)
    ) {
      this.magic -= attackSkill.magic;

      opponent.health -= attackSkill.damage;

      this.counter += 1;

      console.log(this.showStatus());
      console.log(opponent.showStatus());
    } else {
      console.log("The attack cannot be performed.  Check the conditions");
    }
  }
}

divider("Pikachu");
let pikachu = new Pokemon("Pikachu", 220, 110, [], 0);
let lightning = new Attackskill("Lightning", 230, 50);
pikachu.learnAttackSkill(lightning);
console.log(pikachu);
console.log(lightning);

pikachu.counter = 6;
console.log(pikachu.showStatus());

pikachu.getMagics();
console.log(pikachu.magic);

console.log(pikachu.hasEnoughMagic("Lightning"));

console.log(pikachu.isAlive());

divider("Bulbasaur");
let bulbasaur = new Pokemon("Bulbasaur", 20, 60, [], 0);
let bombing = new Attackskill("Bombing", 520, 85);
bulbasaur.learnAttackSkill(bombing);
console.log(bulbasaur);
console.log(bombing);

bulbasaur.counter = 2;
console.log(bulbasaur.showStatus());

bulbasaur.getMagics();
console.log(bulbasaur.magic);

console.log(bulbasaur.hasEnoughMagic("Bombing"));

console.log(bulbasaur.isAlive());

pikachu.attack("Lightning", bulbasaur);
