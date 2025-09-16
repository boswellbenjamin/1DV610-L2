import { Person } from "./person.ts";

const randomPerson = Person.random();

console.log("Generated Person:");
console.log(`Name: ${randomPerson.getName()} ${randomPerson.getSurname()}`);
console.log(`Age: ${randomPerson.getAge()}`);
console.log(`Gender: ${randomPerson.getGender()}`);
console.log(`Profession: ${randomPerson.getProfession()}`);
console.log(`Location: ${randomPerson.getCity()}, ${randomPerson.getCountry()}`);
console.log(`Email: ${randomPerson.getEmail()}`);

console.log("\nTo generate AI portrait, run:");
console.log("deno run --allow-read --allow-net example.ts");