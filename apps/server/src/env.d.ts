declare global {
   namespace NodeJS {
      interface ProcessEnv {
         DATABASE_URL: string;
         MONITORING_USERNAME: string;
         MONITORING_PASSWORD: string;
      }
   }
}

export {};
