import mongoose from 'mongoose';
import { EmailDocument } from './email';

interface CommentAttributes {
  text: string;
  email?: EmailDocument;
  name: string;
}

export interface CommentDocument extends mongoose.Document {
  text: string;
  emailId?: EmailDocument;
  name: string;
}

interface CommentModel extends mongoose.Model<CommentDocument> {
  build: (attributes: CommentAttributes) => CommentDocument;
}

const commentSchema = new mongoose.Schema<CommentDocument, CommentModel>(
  {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Email',
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

commentSchema.static(
  'build',
  (attributes: CommentAttributes) => new Comment(attributes)
);

export const Comment = mongoose.model<CommentDocument, CommentModel>(
  'Comment',
  commentSchema
);
