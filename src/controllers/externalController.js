import { contents } from "../data/dummyContent.js";

/**
 * API 1
 * GET /api/external/contents
 */
export const getAllContents = (req, res) => {
  res.json({
    success: true,
    total: contents.length,
    data: contents
  });
};

/**
 * API 2
 * GET /api/external/contents/:id
 */
export const getContentById = (req, res) => {
  const id = parseInt(req.params.id);

  const content = contents.find((c) => c.id === id);

  if (!content) {
    return res.status(404).json({
      success: false,
      message: "Content not found"
    });
  }

  res.json({
    success: true,
    data: content
  });
};
