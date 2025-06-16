import React from 'react';
import { Box, Slider, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const FilterPanel = ({ 
  filters, 
  onFilterChange,
  categories,
  companies
}) => {
  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          multiple
          value={filters.categories}
          onChange={(e) => onFilterChange('categories', e.target.value)}
          renderValue={(selected) => selected.join(', ')}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={filters.categories.indexOf(category) > -1} />
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Company</InputLabel>
        <Select
          multiple
          value={filters.companies}
          onChange={(e) => onFilterChange('companies', e.target.value)}
          renderValue={(selected) => selected.join(', ')}
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              <Checkbox checked={filters.companies.indexOf(company) > -1} />
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, newValue) => onFilterChange('priceRange', newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Slider
          value={filters.minRating}
          onChange={(_, newValue) => onFilterChange('minRating', newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.1}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          />
        }
        label="In Stock Only"
      />
    </Box>
  );
};

export default FilterPanel;