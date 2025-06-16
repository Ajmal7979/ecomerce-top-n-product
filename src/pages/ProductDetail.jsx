import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Button, Grid, Paper, Rating } from '@mui/material';
import { fetchTopProducts } from '../services/api';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch the specific product
        // For demo, we'll simulate finding it from all products
        const allProducts = [];
        const companies = ['amazon', 'flipkart', 'ebay', 'walmart', 'target'];
        
        for (const company of companies) {
          const data = await fetchTopProducts(company, '', 50);
          allProducts.push(...data);
        }
        
        const foundProduct = allProducts.find(p => 
          `${p.company}-${p.name}` === productId
        );
        
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return <Typography>Loading product details...</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <img 
              src={product.image || 'https://via.placeholder.com/400'} 
              alt={product.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Sold by: {product.company}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {product.rating} ({product.reviewCount || '100'} reviews)
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ${product.price}
            </Typography>
            {product.discount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ textDecoration: 'line-through', mr: 1 }}>
                  ${product.originalPrice || product.price * (1 + product.discount/100)}
                </Typography>
                <Chip label={`${product.discount}% off`} color="success" size="small" />
              </Box>
            )}
          </Box>
          <Chip 
            label={product.availability ? 'In Stock' : 'Out of Stock'} 
            color={product.availability ? 'success' : 'error'} 
            sx={{ mb: 3 }}
          />
          <Typography variant="body1" paragraph>
            Category: {product.category}
          </Typography>
          <Typography variant="body1" paragraph>
            Description: {product.description || 'No description available'}
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            disabled={!product.availability}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;