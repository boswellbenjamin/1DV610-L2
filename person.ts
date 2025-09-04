import person from "./person.json" with { type: "json" };
import { getRandomKey } from "./utils.ts";

export class Person {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;

  constructor(firstName: string, lastName: string, age: number, gender: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }
  
  getName(): string {
    return this.firstName;
  }
  
  getAge(): number {
    return this.age;
  }


  getGender(): string {
    return this.gender;
  }

   static random(): Person {
    
    let gender: string;
    const age = person.ages[getRandomKey(person.ages)];
    const firstNameKey = getRandomKey(person.firstNames);
    const firstNameData = person.firstNames[firstNameKey];
    const firstName = firstNameData.name;
    const surName = person.surNames[getRandomKey(person.surNames)];
    
    if (firstNameData.gender === "Female") {
      gender = "female";
    } else {
      gender = "Male";
    }

    return new Person(firstName, surName, age, gender);
  }
}
