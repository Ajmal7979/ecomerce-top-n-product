import React, { useState, useEffect } from 'react';
import { Grid, Container, Pagination, Stack, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import { fetchTopProducts } from '../services/api';
import { generateProductId, getRandomImage } from '../utils/helpers';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    companies: [],
    priceRange: [0, 1000],
    minRating: 0,
    inStockOnly: false,
    sortBy: 'price'
  });

  const categories = [...new Set(products.map(p => p.category))];
  const companies = [...new Set(products.map(p => p.company))];
  const itemsPerPage = 12;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch from all companies and categories
        // In a real app, you might want to optimize this
        const allProducts = [];
        const companies = ['amazon', 'flipkart', 'ebay', 'walmart', 'target'];
        
        for (const company of companies) {
          const data = await fetchTopProducts(company, '', 50);
          const productsWithIds = data.map(product => ({
            ...product,
            id: generateProductId(product),
            image: getRandomImage()
          }));
          allProducts.push(...productsWithIds);
        }
        
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    // Apply filters
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    
    if (filters.companies.length > 0) {
      result = result.filter(p => filters.companies.includes(p.company));
    }
    
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && 
      p.price <= filters.priceRange[1]
    );
    
    result = result.filter(p => p.rating >= filters.minRating);
    
    if (filters.inStockOnly) {
      result = result.filter(p => p.availability);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
    setPage(1); // Reset to first page when filters change
  }, [filters, products]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            companies={companies}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {paginatedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllProducts;