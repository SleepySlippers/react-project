import { useState } from 'react';
import CommentSection from './CommentSection.js';

function Card({ item, getComments }) {
  const [likes, setLikes] = useState(item.currentLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentSectionHidden, setCommentSectionHidden] = useState(true);

  const toggleCommentSection = () => {
    setCommentSectionHidden(!isCommentSectionHidden);
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="card" style={{ 
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: isLiked ? 'LightPink' : 'LightGray',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '250px',
      padding: '16px',
      fontSize: '22px'
    }}>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={toggleLike}
          style={{
            backgroundColor: isLiked ? '#e91e63' : '#dddddd',
            color: isLiked ? 'white' : 'black',
            border: 'none', padding: '8px 12px', borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <span> {likes}</span>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={toggleCommentSection}
          style={{
            backgroundColor: '#dddddd',
            color: 'black',
            border: 'none', padding: '8px 12px', borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isCommentSectionHidden ? '☰' : '✕'}
        </button>
        <span> Discuss ({item.commentsCount}) </span>
        {
          !isCommentSectionHidden &&
          <CommentSection articleId={item.articleId} getComments={getComments} />
        }
      </div>
    </div>
  );
}

export default Card;
