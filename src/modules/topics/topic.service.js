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
}

export default new TopicService();
