# Random Person Generator

A lightweight TypeScript/JavaScript library for generating realistic random person data for testing, development, and prototyping purposes.

> **Note**: This is a school project created for educational purposes.

## Features

- Generate complete person profiles with realistic data
- Age-appropriate profession assignment (students, retirees, babies)
- Gender-specific first names
- Realistic email address generation
- Location data including country, city, postal code, and address
- **AI-powered portrait generation** using Replicate API (bring your own API key)
- TypeScript support with full type definitions
- Zero dependencies for core functionality
- Works in Deno, Node.js, and browsers
- Full OOP design with dependency injection support

## Installation

### Deno (JSR)
```typescript
import { Person } from "@benjaminboswell/random-person-generator";
import { PersonGenerator } from "@benjaminboswell/random-person-generator/generator";
```

### Node.js (npm)
```bash
npm install person-data-generator
```

```javascript
import { Person, PersonGenerator } from "person-data-generator";
// or
const { Person, PersonGenerator } = require("person-data-generator");
```

## Usage

### Basic Usage

```typescript
import { PersonGenerator } from "@benjaminboswell/random-person-generator/generator";

// Create a generator instance
const generator = new PersonGenerator();

// Generate a random person
const person = generator.generate();

console.log(person.getName());        // "Emma"
console.log(person.getSurname());     // "Johnson"
console.log(person.getAge());         // 28
console.log(person.getGender());      // "Female"
console.log(person.getProfession());  // "Software Engineer"
console.log(person.getCountry());     // "United States"
console.log(person.getCity());        // "New York"
console.log(person.getPostalCode());  // "10001"
console.log(person.getAddress());     // "123 Main Street"
console.log(person.getEmail());       // "emma.johnson847@gmail.com"
```

### AI Portrait Generation

Generate AI-powered portraits for your random people using Replicate API:

```typescript
import { PersonGenerator } from "@benjaminboswell/random-person-generator/generator";
import { PortraitGenerator, PortraitGeneratorFactory } from "@benjaminboswell/random-person-generator/ai";

// Generate a person
const personGenerator = new PersonGenerator();
const person = personGenerator.generate();

// Create portrait generator from environment variable
const factory = new PortraitGeneratorFactory();
const portraitGenerator = factory.createFromEnv();

// Generate portrait
const portraitUrl = await portraitGenerator.generatePortrait(person);
console.log(`${person.getName()} ${person.getSurname()}'s portrait: ${portraitUrl}`);
```

#### AI Generation Options

```typescript
const portraitGenerator = new PortraitGenerator("your_api_token", {
  model: "black-forest-labs/flux-schnell", // AI model to use
  width: 512,   // Image width
  height: 512,  // Image height
  steps: 4      // Generation steps (quality vs speed)
});
```

**Requirements for AI features:**
1. Set the environment variable: `REPLICATE_API_TOKEN=your_token_here`
2. Get a free token at [replicate.com](https://replicate.com)

### Generate Multiple People

```typescript
const generator = new PersonGenerator();

// Generate an array of random people
const people = Array.from({ length: 10 }, () => generator.generate());

people.forEach(person => {
  console.log(`${person.getName()} ${person.getSurname()}, ${person.getAge()}`);
});
```

### Custom Configuration with Dependency Injection

```typescript
import { PersonGenerator } from "@benjaminboswell/random-person-generator/generator";
import { EmailGenerator } from "person-data-generator";
import { ProfessionResolver } from "person-data-generator";

// Create custom email generator with specific domains
const emailGenerator = new EmailGenerator(["company.com", "work.org"]);

// Create custom profession resolver with different age thresholds
const professionResolver = new ProfessionResolver(65, 16, 4);

// Inject custom dependencies
const generator = new PersonGenerator(emailGenerator, professionResolver);
const person = generator.generate();
```

### Age-Appropriate Professions

The generator automatically assigns age-appropriate professions:
- Ages 0-5: "Baby"
- Ages 6-17: "Student"
- Ages 68+: "Retired"
- Ages 18-67: Random profession from dataset

## API Reference

### Person Class

A data class representing a person with all their attributes.

#### Constructor

```typescript
new Person(firstName, lastName, age, gender, profession, country, city, postalCode, address, email, portraitUrl?)
```

#### Instance Methods

- `getName()`: Returns the first name (string)
- `getSurname()`: Returns the last name (string)
- `getAge()`: Returns the age (number)
- `getGender()`: Returns "Male" or "Female" (string)
- `getProfession()`: Returns the profession (string)
- `getCountry()`: Returns the country (string)
- `getCity()`: Returns the city (string)
- `getPostalCode()`: Returns the postal code (string)
- `getAddress()`: Returns the street address (string)
- `getEmail()`: Returns the generated email address (string)
- `getPortraitUrl()`: Returns the portrait URL if set (string | undefined)
- `setPortraitUrl(url)`: Sets the portrait URL

### PersonGenerator Class

Generates random Person instances.

#### Constructor

```typescript
new PersonGenerator(emailGenerator?, professionResolver?, randomSelector?, data?)
```

All parameters are optional and allow dependency injection for testing.

#### Instance Methods

- `generate()`: Creates and returns a new random Person

### EmailGenerator Class

Generates random email addresses.

#### Constructor

```typescript
new EmailGenerator(domains?)
```

- `domains`: Optional array of email domains (default: gmail.com, outlook.com, yahoo.com, hotmail.com)

#### Instance Methods

- `generate(firstName, lastName)`: Returns a generated email address

### ProfessionResolver Class

Determines profession based on age.

#### Constructor

```typescript
new ProfessionResolver(retirementAge?, adultAge?, babyAge?)
```

- `retirementAge`: Age when someone is "Retired" (default: 67)
- `adultAge`: Age when someone stops being a "Student" (default: 18)
- `babyAge`: Age when someone stops being a "Baby" (default: 5)

#### Instance Methods

- `resolve(age)`: Returns profession string based on age
- `isAgeBasedProfession(age)`: Returns true if age determines profession

### PortraitGenerator Class

Generates AI portraits using Replicate API.

#### Constructor

```typescript
new PortraitGenerator(apiToken, options?)
```

#### Instance Methods

- `generatePortrait(person, options?)`: Returns Promise<string> with image URL

### PortraitGeneratorFactory Class

Factory for creating PortraitGenerator instances.

#### Instance Methods

- `createFromEnv(options?)`: Creates PortraitGenerator using REPLICATE_API_TOKEN environment variable

## Use Cases

- **Testing**: Generate test data for user registration flows
- **Development**: Populate development databases with realistic data
- **Prototyping**: Create mockups with believable person information
- **Demonstrations**: Show applications with sample user data

## Data Sources

The generator uses curated datasets including:
- Gender-specific first names
- Common surnames
- Age distributions
- Profession categories
- Geographic locations with postal codes
- Realistic street addresses

## License

MIT

## Contributing

Issues and contributions welcome on [GitHub](https://github.com/boswellbenjamin/1DV610-L2).
