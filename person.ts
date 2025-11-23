export class Person {
  private firstName: string;
  private lastName: string;
  private age: number;
  private gender: string;
  private profession: string;
  private country: string;
  private city: string;
  private postalCode: string;
  private address: string;
  private email: string;
  private portraitUrl?: string;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    profession: string,
    country: string,
    city: string,
    postalCode: string,
    address: string,
    email: string,
    portraitUrl?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.profession = profession;
    this.country = country;
    this.city = city;
    this.postalCode = postalCode;
    this.address = address;
    this.email = email;
    this.portraitUrl = portraitUrl;
  }

  getName(): string {
    return this.firstName;
  }

  getSurname(): string {
    return this.lastName;
  }

  getAge(): number {
    return this.age;
  }

  getGender(): string {
    return this.gender;
  }

  getProfession(): string {
    return this.profession;
  }

  getCountry(): string {
    return this.country;
  }

  getCity(): string {
    return this.city;
  }

  getPostalCode(): string {
    return this.postalCode;
  }

  getAddress(): string {
    return this.address;
  }

  getEmail(): string {
    return this.email;
  }

  getPortraitUrl(): string | undefined {
    return this.portraitUrl;
  }

  setPortraitUrl(url: string): void {
    this.portraitUrl = url;
  }
}
