const ENV = process.env.APP_ENV || "local";

const configs = {
  local: {
    appName: "Express API - Local",
    port: 3000,
    databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/localdb"
  },

  dev: {
    appName: "Express API - Dev",
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL
  },

  uat: {
    appName: "Express API - UAT",
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL
  },

  production: {
    appName: "Express API - Production",
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL
  }
};

const config = configs[ENV];

if (!config) {
  throw new Error(`Invalid APP_ENV: ${ENV}`);
}

export default config;
