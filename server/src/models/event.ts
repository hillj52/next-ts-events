import mongoose from 'mongoose';

import { CommentDocument } from './comment';

interface EventAttributes {
  title: string;
  date: Date;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
}

export interface EventDocument extends mongoose.Document<EventAttributes> {
  title: string;
  date: Date;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  comments: CommentDocument[];
}

interface EventModel extends mongoose.Model<EventDocument> {
  build: (attributes: EventAttributes) => EventDocument;
}

const eventSchema = new mongoose.Schema<EventDocument, EventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
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

eventSchema.static(
  'build',
  (attributes: EventAttributes) => new Event(attributes)
);

export const Event = mongoose.model<EventDocument, EventModel>(
  'Event',
  eventSchema
);
