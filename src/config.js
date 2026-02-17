import dotenv from "dotenv";
dotenv.config();
const ENV = process.env.APP_ENV || "local";

const configs = {
  local: {
    appName: "Express API - Local",
    DATABASE_URL: "postgresql://postgres:password@localhost:5432/localdb",
    STRAPI_URL: "http://localhost:1337/api",
    STRAPI_TOKEN: "local_strapi_token",
    JWT_SECRET: "supersecretkey123",
    POSTMARK_API_KEY: "POSTMARK_API_KEY"
  },

  uat: {
    appName: "Express API - UAT",
    DATABASE_URL: "databaseUrl",
    STRAPI_URL: "STRAPI_URL",
    STRAPI_TOKEN: "local_strapi_token",
    JWT_SECRET: "JWT_SECRET",
    POSTMARK_API_KEY: "POSTMARK_API_KEY"
  },

  production: {
    appName: "Express API - Production",
    DATABASE_URL: "live",
    STRAPI_URL: "live",
    STRAPI_TOKEN: "local_strapi_token",
    JWT_SECRET: "live",
    POSTMARK_API_KEY: "live"
  }
};

const config = configs[ENV];

if (!config) {
  throw new Error(`Invalid APP_ENV: ${ENV}`);
}

Object.keys(config).forEach((key) => {
  if (!process.env[key]) {
    process.env[key] = config[key];
  }
});

export default config;
