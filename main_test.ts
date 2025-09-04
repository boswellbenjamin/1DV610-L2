import { assertEquals } from "@std/assert";
import { Person } from "./person.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
