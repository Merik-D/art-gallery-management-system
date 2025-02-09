import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CatalogPage from './pages/CatalogPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:artworkId/edit" element={<EditPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
