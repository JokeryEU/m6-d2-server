import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  { timestamps: true }
);

AuthorSchema.static("findAuthorWithArticles", async function (id) {
  const author = await this.findById(id).populate("articles");
  return author;
});

export default model("Author", AuthorSchema);
