import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsComponent from './components/NewsComponent.jsx';
import Menu from './components/Menu';
import NewsGrid from './components/NewsGrid';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Dohvacanje clanaka
  const fetchData = async () => {
    const apiKey = '9a9deb73b3c245cdbea0431ecac1f059';
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=general&apiKey=005a9642fe0c4672919436cf0a113f0e`
      );
      const newArticles = response.data.articles;

      // Filtriranje clanaka
      const uniqueArticles = newArticles.filter((newArticle) => {
        return !articles.some((existingArticle) => existingArticle.id === newArticle.id);
      });

      setArticles((prevArticles) => [...prevArticles, ...uniqueArticles]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Ucitavanje vise clanaka
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Dohvacanje pomocu category and search query
  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=021baff830cb4c8fa2c688eefdd78b46`;
    if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=021baff830cb4c8fa2c688eefdd78b46`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(data.articles));
  }, [category, searchQuery]);

  // Ucitavanje favorita iz lokalne memorije
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);
  return (
    <div className="App">
      <h1 className="title">MyNews</h1>
      <SearchBar onSearch={handleSearch} />
      <Menu active={active} setActive={setActive} setCategory={setCategory} />
      <div className="news-container">
        <div className="news-component">
          {active === 1 && <NewsComponent articles={articles} />}
        </div>
        <div className="news-grid">
          {active === 7 ? (
            <NewsGrid items={filteredItems} favorites={favorites} setFavorites={setFavorites} category={'favorites'}/>
          ) : (
            <NewsGrid items={items} favorites={favorites} setFavorites={setFavorites} />
          )}
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );

}

export default App;
