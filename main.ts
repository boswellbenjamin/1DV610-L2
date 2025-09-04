import { Person } from "./person.ts";

const randomPerson = Person.random();

console.log(randomPerson.getName());
console.log(randomPerson.getAge());
console.log(randomPerson.getGender());
