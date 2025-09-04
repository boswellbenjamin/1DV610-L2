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
    const firstNameKey = getRandomKey(person.firstNames);
    const firstName = person.firstNames[firstNameKey];

    return this.firstName;
  }
  
  getAge(): number {
    return this.age;
  }

   static random(): Person {
    
    const firstNameKey = getRandomKey(person.firstNames);
    const surNameKey = getRandomKey(person.surNames);
    const ageKey = getRandomKey(person.ages);
    const ageNumber = person.ages[ageKey];
    const firstName = person.firstNames[firstNameKey];
    const surName = person.surNames[surNameKey];

    return new Person(firstName, surName, ageNumber);
  }
}
