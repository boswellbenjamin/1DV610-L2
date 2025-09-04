import person from "./person.json" with { type: "json" };
import { getRandomKey } from "./utils.ts";

export class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  getName(): string {
    return this.firstName;
  }
  
  getAge(): number {
    return this.age;
  }

   static random(): Person {
    
    const age = person.ages[getRandomKey(person.ages)];
    const firstName = person.firstNames[getRandomKey(person.firstNames)];
    const surName = person.surNames[getRandomKey(person.surNames)];

    return new Person(firstName, surName, age);
  }
}
