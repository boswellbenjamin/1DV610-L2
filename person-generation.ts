import { PersonGenerator } from "./person-generator.ts";

const generator = new PersonGenerator();
const randomPerson = generator.generate();

console.log("Generated Person:");
console.log(`Name: ${randomPerson.getName()} ${randomPerson.getSurname()}`);
console.log(`Age: ${randomPerson.getAge()}`);
console.log(`Gender: ${randomPerson.getGender()}`);
console.log(`Profession: ${randomPerson.getProfession()}`);
console.log(
  `Location: ${randomPerson.getCity()}, ${randomPerson.getCountry()}, ${randomPerson.getPostalCode()}, ${randomPerson.getAddress()}`
);
console.log(`Email: ${randomPerson.getEmail()}`);
