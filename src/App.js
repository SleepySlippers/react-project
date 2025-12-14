import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import data from './assets/mock-data.json';
import Card from './components/Card.js';
import Tiler from './components/Tiler.js';
import { getArticles, getComments } from './api/mock-api.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ArticlesList from './pages/ArticlesList.js';
import ArticleDetail from './pages/ArticleDetail.js';
import NotFound from './pages/NotFound.js';

function App() {
  const [items] = useState(data);

  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesList getArticles={getArticles} getComments={getComments} card={Card} />} />
            <Route path="/articles/:articleId" element={<ArticleDetail getArticles={getArticles} getComments={getComments} card={Card} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </header>
    </div>
    </Router>
  );
}

export default App;

