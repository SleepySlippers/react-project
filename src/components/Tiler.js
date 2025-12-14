import { useState, useEffect } from 'react';

function Tiler({ getArticles, getComments, card: CardComponent }) {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
      getArticles().then(data => setArticles(data))
  }, []);

  const loadingTextOrContent = (data, content) =>
    data == null ? (
        <div className="loading" style={{
        }}>
          Loading...
        </div>
    ) : content()

  return loadingTextOrContent(articles, () =>
      <div className="articles-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 250px)',
        gridTemplateRows: 'auto 1fr auto',
        width: '100%',
        gap: '1.5%',
        padding: '5%',
        maxWidth: '85%',
        justifyContent: 'center',
        margin: '0 auto'
      }}>
        {
          articles.map(item => (
            <CardComponent
              key={item.id}
              item={item}
              getComments={getComments}
              shortenedVersion={true}
            />
          ))
        }
      </div>
  );
}

export default Tiler;
