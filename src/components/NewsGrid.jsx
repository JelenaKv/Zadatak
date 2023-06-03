import NewsItem from './NewsItem';

function NewsGrid({ items, category, favorites, setFavorites }) {
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <div className="news-grid">
      {filteredItems.map((item) => (
        <NewsItem key={item.url} item={item} favorites={favorites} setFavorites={setFavorites} />
      ))}
    </div>
  );
}

export default NewsGrid;