import axios from "axios";

const strapiClient = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    Authorization: process.env.STRAPI_TOKEN
      ? `Bearer ${process.env.STRAPI_TOKEN}`
      : undefined,
  },
  timeout: 10000,
});
strapiClient.interceptors.request.use((config) => {
  const base = config.baseURL?.replace(/\/$/, "") || "";
  const path = config.url?.replace(/^\//, "") || "";
  const finalUrl = `${base}/${path}`;

//   console.log("=== STRAPI REQUEST ===");
//   console.log("process.env.STRAPI_URL:", process.env.STRAPI_URL);
//   console.log("Method:", config.method?.toUpperCase());
//   console.log("Full URL:", finalUrl);
//   console.log("Params:", config.params);
//   console.log("======================");

  return config;
});

export default strapiClient;
