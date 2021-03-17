import React from 'react';
import { Comment } from '../../utils/api-utils/comments';
import classes from './comment-list.module.css';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <ul className={classes.comments}>
    {comments.map((comment) => (
      <li key={comment.id}>
        {' '}
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
    ))}
  </ul>
);


export default CommentList;