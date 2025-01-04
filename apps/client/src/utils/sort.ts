export const sortOptions = [
   'typeAsc',
   'typeDesc',
   'rarityAsc',
   'rarityDesc',
   'levelAsc',
   'levelDesc',
   'noSort',
] as const;

export type SortOption = (typeof sortOptions)[number];
