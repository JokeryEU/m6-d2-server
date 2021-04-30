import express from "express";
import AuthorSchema from "../schemas/authors.js";
import ErrorResponse from "../lib/errorResponse.js";

const authorRouter = express.Router();

authorRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).send({ authors });
  } catch (error) {
    next(error);
  }
});

authorRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = await AuthorSchema.create(req.body);
    res.status(201).send({ newAuthor });
  } catch (error) {
    next(error);
  }
});

authorRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id).populate("articles");
    if (!author) return next(new ErrorResponse(`id not found`, 404));
    res.status(200).send({ author });
  } catch (error) {
    next(error);
  }
});

export default authorRouter;
