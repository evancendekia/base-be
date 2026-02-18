import topicService from "./topic.service.js";

export const getTopics= async (req, res, next) => {
  try {
    const result = await topicService.getTopicList();

    return res.json({
        status: "success",
        data: result.data,
    });
    // return res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getTopicsDetails = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await topicService.getTopicDetails(slug);

    return res.json(transformListCategory(result));
    // return res.json(result);
  } catch (error) {
    next(error);
  }
};


const transformListCategory = (data) => ({
  data: data.data.map((category) => ({
    id: category.id,
    name: category.name,
    banner:
      category.banner?.formats?.large?.url ||
      category.banner?.url ||
      null,
    slug: category.slug,
    description: category.Description || null,
    publishedAt: category.publishedAt,

    articles:
        category.articles?.map((art) => ({
        id: art.id,
        title: art.title,
        slug: art.slug,
        content: art.content,
        image: art.featuredImage.formats?.small?.url || art.featuredImage.url || null,
        })) || [],
    
  })),
  meta: data.meta || null,
});




