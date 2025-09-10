export function getRandomKey<T extends object>(obj: T): keyof T {
  const keys = Object.keys(obj) as (keyof T)[];
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

export function professionByAge(age: number): string {
  if (age > 67) {
    return "Retired";
  } else if (age < 18 && age > 5) {
    return "Student";
  } else if (age <= 5) {
    return "Baby";
  } else {
    return "";
  }
}