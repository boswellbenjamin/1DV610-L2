export class RandomSelector {
  selectKey<T extends object>(obj: T): keyof T {
    const keys = Object.keys(obj) as (keyof T)[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  selectFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}
