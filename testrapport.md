# Test Report - Random Person Generator

## Summary

I tested my module using Deno's built-in test framework to make sure everything works correctly. The tests check that the Person class constructor and all getter methods function as intended, and that the portrait URL feature behaves properly. For the automated tests, I used specific input values rather than random data to ensure the tests produce consistent, predictable results every time.

## Test Environment

- **Test Framework:** Deno test framework
- **Language:** TypeScript
- **Command:** `deno test`
- **Latest test date:** 30th September 2025

## Test Results

| What I tested                          | How I tested it                                                                                                             | Result |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------ |
| Person constructor with all parameters | Created a Person object with all values including portraitUrl and checked that all getter methods return the correct values | PASS   |
| Person constructor without portraitUrl | Created a Person object without the portraitUrl parameter and verified that getPortraitUrl() returns undefined              | PASS   |
| setPortraitUrl() method                | Created a Person object without portraitUrl, called setPortraitUrl() and confirmed the value was saved correctly            | PASS   |
| getName() method                       | Checked that firstName is returned correctly from the constructor                                                           | PASS   |
| getSurname() method                    | Checked that lastName is returned correctly from the constructor                                                            | PASS   |
| getAge() method                        | Verified that age is returned correctly from the constructor                                                                | PASS   |
| getGender() method                     | Confirmed that gender is returned correctly from the constructor                                                            | PASS   |
| getProfession() method                 | Verified that profession is returned correctly from the constructor                                                         | PASS   |
| getCountry() method                    | Checked that country is returned correctly from the constructor                                                             | PASS   |
| getCity() method                       | Verified that city is returned correctly from the constructor                                                               | PASS   |
| getPostalCode() method                 | Confirmed that postalCode is returned correctly from the constructor                                                        | PASS   |
| getAddress() method                    | Checked that address is returned correctly from the constructor                                                             | PASS   |
| getEmail() method                      | Verified that email is returned correctly from the constructor                                                              | PASS   |

## Manual Testing of Person.random()

| What I tested                              | How I tested it                                                                                            | Result |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------ |
| Person.random() generates different people | Called Person.random() several times and confirmed that it creates different people each time              | PASS   |
| Age-appropriate professions                | Generated multiple people and verified that ages 0-5 get "Baby", 6-17 get "Student", and 68+ get "Retired" | PASS   |
| Email format                               | Checked that generated emails follow the format firstname.lastname + number @ domain                       | PASS   |

## Test Statistics

- **Total automated tests:** 3
- **Passed tests:** 3
- **Failed tests:** 0
- **Coverage:** All public methods in the Person class

## Known Limitations

- I didn't test the PersonAI class automatically since it needs an external API key
- The JSON data file (person.json) isn't validated for correctness

## Conclusion

All the basic functionality in the Person class works as expected. The module is ready for other programmers to use in their projects.
