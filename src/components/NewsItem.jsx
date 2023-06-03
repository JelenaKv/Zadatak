import React, { useState, useEffect } from 'react';

function NewsItem({ item, favorites, setFavorites }) {
  const websiteUrl = item.url;
  const website = websiteUrl.split('https://').pop().split('/')[0];

  const date = item.publishedAt;
  const formatDate = date.replace('T', ' ');
  const formatTime = formatDate.replace('Z', '');

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.url === item.url));
  }, [item.url]);

  const handleFavorite = () => {
    const existingFavorite = favorites.find((fav) => fav.url === item.url);
    if (!existingFavorite) {
      const newFavorite = { ...item, category: 'favorites' };
      setFavorites([...favorites, newFavorite]);
      localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
      setIsFavorite(true);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.url !== item.url);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    }
  };

  return (
    <div className="clanak">
      <button
        type="button"
        className={`favorite ${isFavorite ? 'active' : ''}`}
        onClick={handleFavorite}
      >
        {isFavorite ? '-' : '+'}
      </button>
      <a href={item.url} className="article">
        <div className="article-image">
          <img src={item.urlToImage} alt={item.title} />
        </div>
        <div className="article-content">
          <div className="article-source">
            <img
              src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${website}&size=16`}
              alt={item.source.id}
            />
            <span>{item.source.name}</span>
          </div>
          <div className="article-title">
            <h2>{item.title}</h2>
          </div>
          <p className="article-description">{item.description}</p>
          <div className="article-details">
            <small>
              <b>Published At: </b>
              {formatTime}
            </small>
          </div>
        </div>
      </a>
    </div>
  );
}
export default NewsItem;