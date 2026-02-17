import topicService from "./topic.service.js";

export const getTopics= async (req, res, next) => {
  try {
    const result = await topicService.getTopicList();
    return res.json(result);
  } catch (error) {
    next(error);
  }
};


