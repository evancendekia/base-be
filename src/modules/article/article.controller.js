import articleService from "./article.service.js";

export const getArticles = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const result = await articleService.getArticles({
      page,
      pageSize,
    });

    console.log("Articles Result:", result);

    return res.json(transformList(result));
  } catch (error) {
    next(error);
  }
};

export const getArticlesGrouped = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 50 } = req.query;

    const result = await articleService.getArticles({
      page,
      pageSize,
    });

    const grouped = groupByCategory(result.data);

    return res.json({
      data: grouped,
    });
  } catch (error) {
    next(error);
  }
};


export const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await articleService.getBySlug(slug);

    if (!result.data?.length) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.json(transformDetail(result.data[0]));
  } catch (error) {
    next(error);
  }
};

const transformList = (data) => ({
  data: data.data.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    description: article.description || null,
    thumbnail:
      article.featuredImage?.formats?.thumbnail?.url ||
      article.featuredImage?.url ||
      null,
    publishedAt: article.publishedAt,
  })),
  meta: data.meta || null,
});

const transformDetail = (article) => ({
  id: article.id,
  documentId: article.documentId,
  title: article.title,
  slug: article.slug,
  description: article.description,
  content: article.content,
  createdAt: article.createdAt,
  publishedAt: article.publishedAt,

  featuredImage: article.featuredImage
    ? {
        url: article.featuredImage.url,
        thumbnail:
          article.featuredImage.formats?.thumbnail?.url || null,
        small:
          article.featuredImage.formats?.small?.url || null,
        medium:
          article.featuredImage.formats?.medium?.url || null,
        large:
          article.featuredImage.formats?.large?.url || null,
      }
    : null,

  author: article.author
    ? {
        id: article.author.id,
        username: article.author.username,
      }
    : null,

  categories:
    article.categories?.map((cat) => ({
      id: cat.id,
      name: cat.name,
    })) || [],
});

const groupByCategory = (articles) => {
  const map = {};

  articles.forEach((article) => {
    const categories = article.categories || [];

    categories.forEach((category) => {
      if (!map[category.name]) {
        map[category.name] = {
          id: category.id,
          name: category.name,
          articles: [],
        };
      }

      map[category.name].articles.push({
        id: article.id,
        title: article.title,
        slug: article.slug,
        description: article.description,
        thumbnail:
          article.featuredImage?.formats?.thumbnail?.url ||
          article.featuredImage?.url ||
          null,
        publishedAt: article.publishedAt,
      });
    });
  });

  return Object.values(map);
};

