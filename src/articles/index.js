import express from "express";

import ArticleSchema from "../schemas/schema.js";

const articleRouter = express.Router();

articleRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find();
    res.send(articles);
  } catch (error) {
    next(error);
  }
});

articleRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await ArticleSchema.findById(id);
    if (article) {
      res.send(article);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading article list a problem occurred!");
  }
});

articleRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleSchema(req.body);
    const { _id } = await newArticle.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (article) {
      res.send(article);
    } else {
      const error = new Error(`The article with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndDelete(req.params.id);
    if (article) {
      res.send("Deleted");
    } else {
      const error = new Error(`The article with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

export default articleRouter;
