import strapiClient from "../../config/strapi.js";

class ArticleService {
  async getArticles({ page = 1, pageSize = 10 }) {
    try {
      const response = await strapiClient.get("/articles", {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          // populate: ["featuredImage", "categories"],
          "populate[featuredImage]": true,
          "populate[categories][populate][banner]": true,
          sort: "publishedAt:desc",
        },
      });
      return response.data;
    } catch (error) {
      console.log("STRAPI ERROR:");
      console.log(error.response?.data);
      throw error;
    }
  }
  async getArticlesByCategories({ page = 1, pageSize = 10 }) {
    try {
      const response = await strapiClient.get("/categories", {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          // populate: ["featuredImage", "categories"],
          
          "populate[banner]": true,
          "populate": "articles",
          "populate[articles]": "*",
          "populate[articles][populate]":"featuredImage",
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

  async getBySlug(slug) {
    const response = await strapiClient.get("/articles", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });

    return response.data;
  }

  async getTopicList() {
    try {
      const response = await strapiClient.get("/categories");

      return response.data;
    } catch (error) {
      console.log("STRAPI ERROR:");
      console.log(error.response?.data);
      throw error;
    }
  }
}

export default new ArticleService();
