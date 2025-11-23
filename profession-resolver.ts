export class ProfessionResolver {
  private retirementAge: number;
  private adultAge: number;
  private babyAge: number;

  constructor(retirementAge = 67, adultAge = 18, babyAge = 5) {
    this.retirementAge = retirementAge;
    this.adultAge = adultAge;
    this.babyAge = babyAge;
  }

  resolve(age: number): string {
    if (age > this.retirementAge) {
      return "Retired";
    } else if (age < this.adultAge && age > this.babyAge) {
      return "Student";
    } else if (age <= this.babyAge) {
      return "Baby";
    } else {
      return "";
    }
  }

  isAgeBasedProfession(age: number): boolean {
    return this.resolve(age) !== "";
  }
}
