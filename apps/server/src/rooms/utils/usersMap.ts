import type { Role } from 'shared';

interface User {
   username: string;
   characterName: string;
   role: Role;
}

export const usersMap = new Map<string, User>();
