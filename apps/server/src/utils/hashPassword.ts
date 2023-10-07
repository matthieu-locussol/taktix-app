import crypto from 'crypto';

export const hashPassword = async (password: string) => {
   const digestPassword = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
   const hashedPassword = Array.from(new Uint8Array(digestPassword))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

   return hashedPassword;
};
