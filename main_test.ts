import { assertEquals } from "@std/assert";
import { Person } from "./person.ts";

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
