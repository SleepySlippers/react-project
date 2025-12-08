import { useState } from 'react';

function Card({ item }) {
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
    </div>
  );
}

export default Card;
