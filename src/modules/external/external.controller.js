// import { contents } from "../data/dummyContent.js";
import prisma from "../../config/prisma.js";


export const getAllContents = async(req, res) => {

  const contents = await prisma.content.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json({
    success: true,
    total: contents.length,
    data: contents
  });
};


export const getContentById = async (req, res) => {
  const id = parseInt(req.params.id);
  const content = await prisma.content.findUnique({
    where: { id }
  });
  // const content = contents.find((c) => c.id === id);
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

export const createContent = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      imageName,
      category,
      status,
      author
    } = req.body;

    const newContent = await prisma.content.create({
      data: {
        title,
        subtitle,
        description,
        imageName,
        category,
        status,
        author
      }
    });

    res.status(201).json({
      success: true,
      data: newContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
