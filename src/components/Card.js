import { useState } from 'react';
import CommentSection from './CommentSection.js';

function Card({ item, getComments, shortenedVersion = false }) {
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

  const truncate = (str, maxLength = 100) =>
    str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

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
      <a href={`/articles/${item.articleId}`}><h3>{item.title}</h3></a>
      <p>{ shortenedVersion ? truncate(item.text) : item.text }</p>
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
      { !shortenedVersion &&
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
      }
    </div>
  );
}

export default Card;
