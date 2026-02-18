import strapiClient from "../../config/strapi.js";

class TopicService {
  async getTopicList() {
    try {
      const response = await strapiClient.get("/categories",{
        params: {
          sort: "name:asc",
        },
      });

      return response.data;
    } catch (error) {
      console.log("STRAPI ERROR:");
      console.log(error.response?.data);
      throw error;
    }
  }

  async getTopicDetails(slug) {
    try {
      // const response = await strapiClient.get(`/categories?populate=articles&filters[slug]=${slug}`);
      const response = await strapiClient.get("/categories", {
        params: {
          // "pagination[page]": page,
          // "pagination[pageSize]": pageSize,

          "populate": "articles",
          "populate[articles]": "*",
          "populate[articles][populate]":"featuredImage",

          "populate[banner]": true, 
          // "populate[articles][populate][featuredImage]": true,
          "filters[slug]": slug,
          sort: "name:asc",
        },
      });
      return response.data;
    } catch (error) {
      console.log("STRAPI ERROR:");
      console.log(error.response?.data);
      throw error;
    }
  }
}

export default new TopicService();
