export namespace ArrayMgt {
   export const areEquals = <T extends number | string>(arr1: T[], arr2: T[]): boolean =>
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set(arr2).size &&
      arr1.every((value) => arr2.includes(value));
}
