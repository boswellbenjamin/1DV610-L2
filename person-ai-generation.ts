import { PersonGenerator } from "./person-generator.ts";
import { PortraitGeneratorFactory } from "./person-ai.ts";

async function main() {
  const personGenerator = new PersonGenerator();
  const randomPerson = personGenerator.generate();

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

    const portraitFactory = new PortraitGeneratorFactory();
    const portraitGenerator = portraitFactory.createFromEnv();
    const imageUrl = await portraitGenerator.generatePortrait(randomPerson);

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

main();
