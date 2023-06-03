import React from 'react';
import './NewsComponent.css'; 

const NewsComponent = ({ articles }) => {
  return (
    <div className="news-container">
      <div className="news-box">
        {articles.map((article, index) => (
          <div className="news-item" key={index}>
            <h3>{article.title}</h3>
            {article.date && (
              <p>{new Date(article.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
