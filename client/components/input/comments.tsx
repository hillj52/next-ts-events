import React, { useEffect, useState } from 'react';
import CommentList from './comment-list';
import NewComment, { CommentData } from './new-comment';
import { Comment, GetResponseType } from '../../pages/api/comments/[eventId]';
import classes from './comments.module.css';
import axios from 'axios';

interface CommentsProps {
  eventId: string;
}

const Comments: React.FC<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (showComments) {
      axios
        .get<GetResponseType>(`/api/comments/${eventId}`)
        .then(response => {
          setComments(response.data.comments);
        });
    }
  }, [showComments])

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler: (commentData: CommentData) => Promise<void> = async (commentData) => {
    const response = await axios.post(`/api/comments/${eventId}`, { ...commentData })
    console.log(response);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;