import { useState, useEffect } from 'react';
import Comment from './Comment.js';

function CommentSection({ getComments, articleId }) {
  const [comments, setComments] = useState(null)

  useEffect(() => {
      getComments().then(data => setComments(data))
  }, []);

  const loadingTextOrContent = (data, content) =>
    data == null ? (
        <div className="loading" style={{
        }}>
          Loading...
        </div>
    ) : content()

  return loadingTextOrContent(comments, () =>
    <div className="comment-section" style={{
      border: '1px solid #bbb',
      borderRadius: '10px',
      margin: '0 auto'
    }}>
      {
        comments.filter(item => item.articleId == articleId).map(item => (
          <Comment key={item.id} item={item} getComments={getComments} />
        ))
      }
    </div>
  );
}

export default CommentSection;
