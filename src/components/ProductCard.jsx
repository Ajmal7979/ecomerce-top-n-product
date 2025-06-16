import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { getRandomImage } from '../utils/helpers';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, cursor: 'pointer' }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || getRandomImage()}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.company} • {product.category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="h6">${product.price}</Typography>
          <Chip 
            label={`${product.discount}% off`} 
            color="success" 
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Chip 
            label={`⭐ ${product.rating}`} 
            color="primary" 
            size="small"
          />
          <Chip 
            label={product.availability ? 'In Stock' : 'Out of Stock'} 
            color={product.availability ? 'success' : 'error'} 
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;