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

## Installation

### Deno (JSR)
```typescript
import { Person } from "@benjaminboswell/random-person-generator";
```

### Node.js (npm)
```bash
npm install person-data-generator
```

```javascript
import { Person } from "person-data-generator";
// or
const { Person } = require("person-data-generator");
```

## Usage

### Basic Usage

```typescript
import { Person } from "@benjaminboswell/random-person-generator";

// Generate a random person
const person = Person.random();

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
import { Person, PersonAI } from "@benjaminboswell/random-person-generator";

// First, set up your .env file with your Replicate API token
// REPLICATE_API_TOKEN=r8_your_token_here

// Generate a person and their AI portrait
const person = Person.random();
const portraitUrl = await PersonAI.generate(person);

console.log(`${person.getName()} ${person.getSurname()}'s portrait: ${portraitUrl}`);
```

#### AI Generation Options

```typescript
const portraitUrl = await PersonAI.generate(person, {
  model: "black-forest-labs/flux-schnell", // AI model to use
  width: 512,   // Image width
  height: 512,  // Image height
  steps: 4      // Generation steps (quality vs speed)
});
```

**Requirements for AI features:**
1. Create a `.env` file in your project root
2. Add your Replicate API token: `REPLICATE_API_TOKEN=your_token_here`
3. Get a free token at [replicate.com](https://replicate.com)

### Generate Multiple People

```typescript
// Generate an array of random people
const people = Array.from({ length: 10 }, () => Person.random());

people.forEach(person => {
  console.log(`${person.getName()} ${person.getSurname()}, ${person.getAge()}`);
});
```

### Age-Appropriate Professions

The generator automatically assigns age-appropriate professions:
- Ages 0-5: "Baby"
- Ages 6-17: "Student"  
- Ages 68+: "Retired"
- Ages 18-67: Random profession from dataset

## API Reference

### Person Class

#### Static Methods

- `Person.random()`: Generates a new random Person instance

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

### PersonAI Class

#### Static Methods

- `PersonAI.generate(person, options?)`: Generates an AI portrait URL for the given person
  - Requires `REPLICATE_API_TOKEN` in `.env` file
  - Returns a Promise that resolves to the image URL (string)

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