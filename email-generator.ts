export class EmailGenerator {
  private domains: string[];

  constructor(domains?: string[]) {
    this.domains = domains ?? ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
  }

  generate(firstName: string, lastName: string): string {
    const randomDomain = this.domains[Math.floor(Math.random() * this.domains.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    const emailUser = `${firstName}.${lastName}${randomNumber}`;
    return `${emailUser.toLowerCase()}@${randomDomain}`;
  }
}
