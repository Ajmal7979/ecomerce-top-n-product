import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;