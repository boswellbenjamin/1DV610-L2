import { assertEquals } from "@std/assert";
import { Person } from "./person.ts";
import { PersonGenerator } from "./person-generator.ts";
import { EmailGenerator } from "./email-generator.ts";
import { ProfessionResolver } from "./profession-resolver.ts";
import { RandomSelector } from "./random-selector.ts";

// Person class tests
Deno.test("Person constructor and getters", () => {
  const person = new Person(
    "John",
    "Doe",
    30,
    "Male",
    "Developer",
    "USA",
    "New York",
    "10001",
    "123 Main St",
    "john.doe@example.com",
    "https://example.com/portrait.jpg"
  );

  assertEquals(person.getName(), "John");
  assertEquals(person.getSurname(), "Doe");
  assertEquals(person.getAge(), 30);
  assertEquals(person.getGender(), "Male");
  assertEquals(person.getProfession(), "Developer");
  assertEquals(person.getCountry(), "USA");
  assertEquals(person.getCity(), "New York");
  assertEquals(person.getPostalCode(), "10001");
  assertEquals(person.getAddress(), "123 Main St");
  assertEquals(person.getEmail(), "john.doe@example.com");
  assertEquals(person.getPortraitUrl(), "https://example.com/portrait.jpg");
});

Deno.test("Person constructor without portrait URL", () => {
  const person = new Person(
    "Jane",
    "Smith",
    25,
    "Female",
    "Designer",
    "Canada",
    "Toronto",
    "M5V 3A8",
    "456 Oak Ave",
    "jane.smith@example.com"
  );

  assertEquals(person.getName(), "Jane");
  assertEquals(person.getSurname(), "Smith");
  assertEquals(person.getAge(), 25);
  assertEquals(person.getGender(), "Female");
  assertEquals(person.getProfession(), "Designer");
  assertEquals(person.getCountry(), "Canada");
  assertEquals(person.getCity(), "Toronto");
  assertEquals(person.getPostalCode(), "M5V 3A8");
  assertEquals(person.getAddress(), "456 Oak Ave");
  assertEquals(person.getEmail(), "jane.smith@example.com");
  assertEquals(person.getPortraitUrl(), undefined);
});

Deno.test("Person setPortraitUrl method", () => {
  const person = new Person(
    "Bob",
    "Johnson",
    35,
    "Male",
    "Teacher",
    "UK",
    "London",
    "SW1A 1AA",
    "789 Queen St",
    "bob.johnson@example.com"
  );

  assertEquals(person.getPortraitUrl(), undefined);

  person.setPortraitUrl("https://example.com/new-portrait.jpg");
  assertEquals(person.getPortraitUrl(), "https://example.com/new-portrait.jpg");
});

// EmailGenerator tests
Deno.test("EmailGenerator generates valid email format", () => {
  const emailGenerator = new EmailGenerator();
  const email = emailGenerator.generate("John", "Doe");

  assertEquals(email.includes("@"), true);
  assertEquals(email.includes("john.doe"), true);
  assertEquals(email, email.toLowerCase());
});

Deno.test("EmailGenerator uses custom domains", () => {
  const customDomains = ["test.com"];
  const emailGenerator = new EmailGenerator(customDomains);
  const email = emailGenerator.generate("Jane", "Smith");

  assertEquals(email.endsWith("@test.com"), true);
});

// ProfessionResolver tests
Deno.test("ProfessionResolver returns Retired for elderly", () => {
  const resolver = new ProfessionResolver();

  assertEquals(resolver.resolve(68), "Retired");
  assertEquals(resolver.resolve(80), "Retired");
});

Deno.test("ProfessionResolver returns Student for teenagers", () => {
  const resolver = new ProfessionResolver();

  assertEquals(resolver.resolve(10), "Student");
  assertEquals(resolver.resolve(17), "Student");
});

Deno.test("ProfessionResolver returns Baby for young children", () => {
  const resolver = new ProfessionResolver();

  assertEquals(resolver.resolve(3), "Baby");
  assertEquals(resolver.resolve(5), "Baby");
});

Deno.test("ProfessionResolver returns empty string for working age", () => {
  const resolver = new ProfessionResolver();

  assertEquals(resolver.resolve(25), "");
  assertEquals(resolver.resolve(45), "");
});

Deno.test("ProfessionResolver isAgeBasedProfession identifies age-based professions", () => {
  const resolver = new ProfessionResolver();

  assertEquals(resolver.isAgeBasedProfession(70), true);
  assertEquals(resolver.isAgeBasedProfession(10), true);
  assertEquals(resolver.isAgeBasedProfession(3), true);
  assertEquals(resolver.isAgeBasedProfession(30), false);
});

// RandomSelector tests
Deno.test("RandomSelector selectKey returns valid key", () => {
  const selector = new RandomSelector();
  const obj = { a: 1, b: 2, c: 3 };

  const key = selector.selectKey(obj);
  assertEquals(["a", "b", "c"].includes(key as string), true);
});

Deno.test("RandomSelector selectFromArray returns valid element", () => {
  const selector = new RandomSelector();
  const arr = ["apple", "banana", "cherry"];

  const element = selector.selectFromArray(arr);
  assertEquals(arr.includes(element), true);
});

// PersonGenerator tests
Deno.test("PersonGenerator generates a valid Person", () => {
  const generator = new PersonGenerator();
  const person = generator.generate();

  assertEquals(typeof person.getName(), "string");
  assertEquals(typeof person.getSurname(), "string");
  assertEquals(typeof person.getAge(), "number");
  assertEquals(typeof person.getGender(), "string");
  assertEquals(typeof person.getProfession(), "string");
  assertEquals(typeof person.getCountry(), "string");
  assertEquals(typeof person.getCity(), "string");
  assertEquals(typeof person.getPostalCode(), "string");
  assertEquals(typeof person.getAddress(), "string");
  assertEquals(typeof person.getEmail(), "string");
});

Deno.test("PersonGenerator uses injected dependencies", () => {
  const customEmailGenerator = new EmailGenerator(["custom.org"]);
  const customProfessionResolver = new ProfessionResolver(60, 16, 3);
  const generator = new PersonGenerator(
    customEmailGenerator,
    customProfessionResolver
  );

  const person = generator.generate();
  assertEquals(person.getEmail().endsWith("@custom.org"), true);
});
