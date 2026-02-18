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
  async getTopicsByIds (topicIds) {
    if (!topicIds.length) return [];

    const query = topicIds.map(id => `filters[slug][$in][]=${id}`).join("&");
    const res = await strapiClient.get(`/categories?${query}&sort=name:asc`);

    return res.data.data;
  };

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
