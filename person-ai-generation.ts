import { Person } from "./person.ts";
import { PersonAI } from "./person-ai.ts";

async function main() {
  const randomPerson = Person.random();

  console.log("Generated Person:");
  console.log(`Name: ${randomPerson.getName()} ${randomPerson.getSurname()}`);
  console.log(`Age: ${randomPerson.getAge()}`);
  console.log(`Gender: ${randomPerson.getGender()}`);
  console.log(`Profession: ${randomPerson.getProfession()}`);
  console.log(
    `Location: ${randomPerson.getCity()}, ${randomPerson.getCountry()}, ${randomPerson.getPostalCode()}, ${randomPerson.getAddress()}`
  );
  console.log(`Email: ${randomPerson.getEmail()}`);

  try {
    console.log("\nGenerating AI portrait...");

    const imageUrl = await PersonAI.generatePortraitFromEnv(randomPerson);

    console.log("Portrait generated successfully!");
    console.log(`Image URL: ${imageUrl}`);
    console.log(
      `Portrait URL stored in person: ${randomPerson.getPortraitUrl()}`
    );
  } catch (error) {
    console.error("Failed to generate portrait:", error);
    console.log("\nMake sure to:");
    console.log("1. Add your Replicate API token to .env file");
    console.log(
      "2. Replace 'your_replicate_api_token_here' with your actual token"
    );
  }
}

if (import.meta.main) {
  main();
}
