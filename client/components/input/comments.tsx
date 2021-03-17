import React, { useEffect, useState } from 'react';
import CommentList from './comment-list';
import NewComment, { CommentData } from './new-comment';
import { GetResponseType } from '../../pages/api/comments/[eventId]';
import { Comment } from '../../utils/api-utils/comments';
import withNotificationContext, { NotificationContextProps } from '../hoc/with-notification-consumer';
import axios from 'axios';
import classes from './comments.module.css';

interface CommentsProps {
  eventId: string;
}

const Comments: React.FC<CommentsProps & NotificationContextProps> = ({ eventId, appContext }) => {
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
    appContext.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is being submitted',
      status: 'pending',
    });
    try {
      const response = await axios.post(`/api/comments/${eventId}`, { ...commentData })
      appContext.showNotification({
        title: 'Success',
        message: 'Your comment has been saved',
        status: 'success',
      });
    } catch (error) {
      appContext.showNotification({
        title: 'Error',
        message: error.message || 'General Server Error',
        status: 'error',
      });
    }
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

export default withNotificationContext(Comments);