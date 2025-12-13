import { useState } from 'react';

function Comment({ item }) {
  const [likes, setLikes] = useState(item.currentLikes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="comment" style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: isLiked ? 'DeepPink' : 'DimGray',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '50px',
      padding: '16px',
      fontSize: '15px'
    }}>
      <h3>{item.author}</h3>
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
    </div>
  );
}

export default Comment;
