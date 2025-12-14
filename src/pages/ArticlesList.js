import Tiler from '../components/Tiler.js';

function ArticlesList({ getArticles, getComments, card }) {
  return (
    <Tiler 
      getArticles={getArticles} 
      getComments={getComments} 
      card={card} 
    />
  );
}

export default ArticlesList;
