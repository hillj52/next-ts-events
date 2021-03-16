import mongoose from 'mongoose';

interface EmailAttributes {
  email: string;
  sendNewsletter: boolean;
}

export interface EmailDocument extends mongoose.Document<EmailAttributes> {
  email: string;
  sendNewsletter: boolean;
}

interface EmailModel extends mongoose.Model<EmailDocument> {
  build: (attributes: EmailAttributes) => EmailDocument;
}

const emailSchema = new mongoose.Schema<EmailDocument, EmailModel>(
  {
    email: {
      type: String,
      required: true,
    },
    sendNewsletter: {
      type: Boolean,
      required: true,
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

emailSchema.static(
  'build',
  (attributes: EmailAttributes) => new Email(attributes)
);

export const Email = mongoose.model<EmailDocument, EmailModel>(
  'Email',
  emailSchema
);
