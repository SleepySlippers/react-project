import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card.js';

function ArticleDetail({ getArticles, getComments, card: CardComponent }) {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Get all articles and find the one with matching ID
    getArticles().then(articles => {
      const foundArticle = articles.find(a => a.articleId === parseInt(articleId));
      setArticle(foundArticle);
    });
  }, [articleId, getArticles]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CardComponent 
        item={article} 
        getComments={getComments} 
        shortenedVersion={false}
      />
    </div>
  );
}

export default ArticleDetail;
