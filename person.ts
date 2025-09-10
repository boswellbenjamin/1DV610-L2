import person from "./person.json" with { type: "json" };
import { getRandomKey, professionByAge } from "./utils.ts";

export class Person {
  #firstName: string;
  #lastName: string;
  #age: number;
  #gender: string;
  #profession: string;
  #country: string;
  #city: string;
  #postalCode: string;
  #address: string;
  #email: string;

  constructor(firstName: string, lastName: string, age: number, gender: string, profession: string, country: string, city: string, postalCode: string, address: string, email: string) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
    this.#gender = gender;
    this.#profession = profession;
    this.#country = country;  
    this.#city = city;
    this.#postalCode = postalCode;
    this.#address = address;
    this.#email = email;
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

  getCountry(): string {
    return this.#country;
  }

  getCity(): string {
    return this.#city;
  }
  
  getPostalCode(): string {
    return this.#postalCode;
  }

  getAddress(): string {
    return this.#address;
  }

  getEmail(): string {
    return this.#email;
  }

  private static generateFirstName(): { firstName: string, gender: string } {
    const firstNameKey = getRandomKey(person.firstNames);
    const firstNameData = person.firstNames[firstNameKey];
    const firstName = firstNameData.name;
    const gender = firstNameData.gender === "Female" ? "Female" : "Male";
    return { firstName, gender };
  }

  private static generateLocation(): { country: string, city: string, postalCode: string, address: string } {
    const locationKey = getRandomKey(person.locations);
    const locationData = person.locations[locationKey];
    const country = locationData.country;
    const city = locationData.city;
    const postalCode = locationData.postalCode;
    const address = locationData.address;
    return { country, city, postalCode, address };
  }

  private static generateSurname(): string {
    return person.surNames[getRandomKey(person.surNames)];
  }

  private static generateAge(): number {
    return person.ages[getRandomKey(person.ages)];
  }

  private static generateProfession(age: number): string {
    const ageBased = professionByAge(age);
    if (ageBased) return ageBased;
    return person.professions[getRandomKey(person.professions)];
  }

  private static generateEmail(firstName: string, lastName: string) {
    const domains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const emailUser = firstName + "." + lastName + Math.floor(Math.random() * 1000);
    return emailUser.toLowerCase() + "@" + randomDomain;
  }

   static random(): Person {
    const { firstName, gender } = this.generateFirstName();
    const lastName = this.generateSurname();
    const age = this.generateAge();
    const profession = this.generateProfession(age); 
    const { country, city, postalCode, address } = this.generateLocation();
    const email = this.generateEmail(firstName, lastName);
    return new Person(firstName, lastName, age, gender, profession, country, city, postalCode, address, email);
  }
}
