declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: 'development' | 'production';
         DATABASE_URL: string;
         DIRECT_DATABASE_URL: string;
         MONITORING_USERNAME: string;
         MONITORING_PASSWORD: string;
         MAINTENANCE_TOKEN: string;
      }
   }
}

export {};
