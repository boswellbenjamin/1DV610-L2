# Reflection - Random Person Generator

## Naming (Chapter 2)

### Table of identifiers in public interface

| Name                  | Explanation                                  | Reflection and rules from Clean Code                                                                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Person`              | Class name for the main class in the module  | **Use Intention-Revealing Names**: The name "Person" clearly reveals what the class represents, a person with all its attributes. **Class Names**: Follows the rule that class names should be nouns. The name is short, concise and describes exactly what the object represents.              |
| `random()`            | Static method that generates a random person | **Method Names**: Follows the rule that method names should be verbs. "random" clearly describes what the method does, creates something random. **Use Intention-Revealing Names**: The name directly reveals the function's purpose without the reader having to guess.                        |
| `PersonAI`            | Class name for AI functionality              | **Avoid Disinformation**: "AI" is a well-known abbreviation in the programming domain and creates no confusion. **Use Solution Domain Names**: Uses technical terminology that programmers understand. However, the name could be clearer, e.g. "PersonPortraitGenerator".                      |
| `generatePortrait()`  | Method that creates AI-generated portraits   | **Method Names**: Starts with verb "generate" which clearly indicates that the method creates something. **Use Intention-Revealing Names**: The name explains both what is created (portrait) and how (generate). Very clear and descriptive.                                                   |
| `AIGenerationOptions` | Interface for configuring AI generation      | **Use Intention-Revealing Names**: The name clearly describes that this is options/settings for AI generation. **Avoid Mental Mapping**: The reader doesn't need to translate or guess what this interface contains. However, the name is quite long, but that's acceptable for clarity's sake. |

### Reflection chapter 2

Chapter 2 talks about how important it is to give things meaningful names that show what they're supposed to do. Looking at my code, I think I did pretty well with this. Names like "Person" and "generatePortrait()" are clear and tell you exactly what they do. One thing I noticed is that "PersonAI" could be better, maybe something like "PersonPortraitGenerator" would be clearer. But I already have a person ai generator, so that might make it even more confusing. So one big thing i could do is look over file namings for the entire codebase.

I tried to avoid confusing names and used names that are easy to search for. One thing I'm thinking about is whether I should be even more descriptive, like calling the method "generateRandomPerson()" instead of just "random()", but that might make it too long.

## Functions (Chapter 3)

### Table of longest methods/functions

| Method name                                                                                                          | Link or code       | Number of lines (excl ws) | Reflection                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constructor(firstName, lastName, age, gender, profession, country, city, postalCode, address, email, portraitUrl?)` | person.ts:17-29    | 12                        | **Function Arguments**: This method breaks the rule about having few arguments, it has 10-11 parameters which makes it really hard to use and remember. **Too Many Arguments**: According to Clean Code, functions should have as few arguments as possible. A better approach would be to pass in a single object with all the person data instead of listing each field separately. |
| `generatePortrait(person, apiToken, options)`                                                                        | person-ai.ts:32-96 | 65                        | **Do One Thing**: The method does too many things, validates input, builds prompt, makes API calls, polls for results and handles errors. **Small**: With 65 lines it is too long according to Clean Code principles. Should be split into smaller methods like `makeApiRequest()`, `pollForResult()`, `handleApiResponse()`.                                                         |
| `random()`                                                                                                           | person.ts:116-124  | 9                         | **Do One Thing**: The method does one thing well, creates a random person by coordinating different generation methods. **Small**: Good size according to Clean Code. **Have No Side Effects**: No side effects, the method is pure and returns the same type of object every time.                                                                                                   |
| `generateEmail(firstName, lastName)`                                                                                 | utils.ts:19-28     | 10                        | **Function Arguments**: Good with only two arguments (dyadic). **Use Descriptive Names**: The name clearly describes what the function does. **Do One Thing**: Only does one thing, generates an email address. However, error handling could be better, what happens if the name is empty?                                                                                           |
| `professionByAge(age)`                                                                                               | utils.ts:7-17      | 11                        | **Do One Thing**: Does one thing, returns profession based on age. **Function Arguments**: Monadic function which is ideal according to Clean Code.                                                                                                                                                                                                                                   |

### Reflection chapter 3

Chapter 3 is all about writing small, focused functions that do one thing well. Looking at my code, I can see both good and bad examples. The constructor in my Person class is definitely too complicated, it has too many parameters, which makes it hard to use.

My longest method `generatePortrait()` is probably the worst, it's way too long and tries to do everything at once. If I were to fix this, I'd break it up into smaller methods that each handle one specific task.

On the bright side, most of my smaller helper methods like `random()` and `generateEmail()` are pretty good. They're short, do one specific thing, and don't need too many parameters.

## Overall Code Quality Reflection

Working on this module has taught me a lot about Clean Code principles. The biggest thing I learned is how to balance between giving things descriptive names and keeping the code from getting too wordy. Longer names help you understand what's happening, but they can also make your code look really cluttered.

The part about function arguments really opened my eyes. My constructor with 10+ parameters is a perfect example of what not to do.

One area where I succeeded is my smaller utility functions. Methods like `professionByAge()` and `generateEmail()` do exactly one thing and are easy to understand and test. But my `generatePortrait()` method is the opposite. It's trying to do way too much, which makes it long, confusing, and hard to work with.

The naming conventions from Chapter 2 have shifted my perspective on how to approach naming in code. The principle of using verbs for methods and nouns for classes creates a more intuitive structure that makes the code much more self-documenting.

Overall, trying to follow Clean Code principles has made my module much easier to work with and understand, which is exactly what you want when you're making something for other programmers to use.
