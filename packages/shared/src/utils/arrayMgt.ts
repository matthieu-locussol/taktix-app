export namespace ArrayMgt {
   export const areEquals = <T extends number | string>(arr1: T[], arr2: T[]): boolean =>
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set(arr2).size &&
      arr1.every((value) => arr2.includes(value));

   export const staggeredMerge = <T>(arr1: T[], arr2: T[]): T[] => {
      const maxLength = Math.max(arr1.length, arr2.length);
      const merged: T[] = [];

      for (let i = 0; i < maxLength; i += 1) {
         if (i < arr1.length) {
            merged.push(arr1[i]);
         }

         if (i < arr2.length) {
            merged.push(arr2[i]);
         }
      }

      return merged;
   };

   export const filterNullish = <T>(arr: (T | null | undefined)[]): T[] =>
      arr.filter((e): e is T => e !== null && e !== undefined);
}
