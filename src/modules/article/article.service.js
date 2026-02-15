import strapiClient from "../../config/strapi.js";

class ArticleService {
  async getArticles({ page = 1, pageSize = 10 }) {
    try {
        const response = await strapiClient.get("/articles", {
        params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            populate: ["featuredImage", "categories"],
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

  async getBySlug(slug) {
    const response = await strapiClient.get("/articles", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });

    return response.data;
  }
}

export default new ArticleService();
