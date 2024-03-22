import mongoose, { Document } from "mongoose";

interface QuestionDocument extends Document {
  text: string;
  options: string[];
}

const questionSchema = new mongoose.Schema<QuestionDocument>(
  {
    text: { type: String },
    options: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model<QuestionDocument>(
  "Question",
  questionSchema
);

export { questionModel };
