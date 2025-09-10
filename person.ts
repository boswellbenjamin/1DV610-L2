import person from "./person.json" with { type: "json" };
import { getRandomKey } from "./utils.ts";

export class Person {
  #firstName: string;
  #lastName: string;
  #age: number;
  #gender: string;
  #profession: string;

  constructor(firstName: string, lastName: string, age: number, gender: string, profession: string) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
    this.#gender = gender;
    this.#profession = profession;
  }
  
  getName(): string {
    return this.#firstName;
  }

  getSurname(): string {
    return this.#lastName;
  }
  
  getAge(): number {
    return this.#age;
  }


  getGender(): string {
    return this.#gender;
  }

  getProfession(): string {    
    return this.#profession;
  }

  private static generateFirstName(): { firstName: string, gender: string } {
    const firstNameKey = getRandomKey(person.firstNames);
    const firstNameData = person.firstNames[firstNameKey];
    const firstName = firstNameData.name;
    const gender = firstNameData.gender === "Female" ? "Female" : "Male";
    return { firstName, gender };
  }

  private static generateSurname(): string {
    return person.surNames[getRandomKey(person.surNames)];
  }

   static random(): Person {
    const { firstName, gender } = this.generateFirstName();
    const lastName = this.generateSurname();
    const age = person.ages[getRandomKey(person.ages)];
    let profession: string;

    if (age > 67) {
      profession = "Retired";
    } else if (age < 18 && age > 5) {
      profession = "Student";
    } else if (age <= 5) {
      profession = "Child";
    } else {
      profession = person.professions[getRandomKey(person.professions)];
    }

    return new Person(firstName, lastName, age, gender, profession);
  }
}
