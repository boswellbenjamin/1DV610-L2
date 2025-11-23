import personData from "./person.json" with { type: "json" };
import { Person } from "./person.ts";
import { EmailGenerator } from "./email-generator.ts";
import { ProfessionResolver } from "./profession-resolver.ts";
import { RandomSelector } from "./random-selector.ts";

export class PersonGenerator {
  private emailGenerator: EmailGenerator;
  private professionResolver: ProfessionResolver;
  private randomSelector: RandomSelector;
  private data: typeof personData;

  constructor(
    emailGenerator?: EmailGenerator,
    professionResolver?: ProfessionResolver,
    randomSelector?: RandomSelector,
    data?: typeof personData
  ) {
    this.emailGenerator = emailGenerator ?? new EmailGenerator();
    this.professionResolver = professionResolver ?? new ProfessionResolver();
    this.randomSelector = randomSelector ?? new RandomSelector();
    this.data = data ?? personData;
  }

  generate(): Person {
    const { firstName, gender } = this.generateFirstName();
    const lastName = this.generateSurname();
    const age = this.generateAge();
    const profession = this.generateProfession(age);
    const { country, city, postalCode, address } = this.generateLocation();
    const email = this.emailGenerator.generate(firstName, lastName);

    return new Person(
      firstName,
      lastName,
      age,
      gender,
      profession,
      country,
      city,
      postalCode,
      address,
      email
    );
  }

  private generateFirstName(): { firstName: string; gender: string } {
    const firstNameKey = this.randomSelector.selectKey(this.data.firstNames);
    const firstNameData = this.data.firstNames[firstNameKey];
    const firstName = firstNameData.name;
    const gender = firstNameData.gender === "female" ? "Female" : "Male";
    return { firstName, gender };
  }

  private generateSurname(): string {
    const surnameKey = this.randomSelector.selectKey(this.data.surNames);
    return this.data.surNames[surnameKey];
  }

  private generateAge(): number {
    const ageKey = this.randomSelector.selectKey(this.data.ages);
    return this.data.ages[ageKey];
  }

  private generateProfession(age: number): string {
    const ageBased = this.professionResolver.resolve(age);
    if (ageBased) {
      return ageBased;
    }
    const professionKey = this.randomSelector.selectKey(this.data.professions);
    return this.data.professions[professionKey];
  }

  private generateLocation(): {
    country: string;
    city: string;
    postalCode: string;
    address: string;
  } {
    const locationKey = this.randomSelector.selectKey(this.data.locations);
    const locationData = this.data.locations[locationKey];
    return {
      country: locationData.country,
      city: locationData.city,
      postalCode: locationData.postalCode,
      address: locationData.address,
    };
  }
}
