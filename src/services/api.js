import axios from 'axios';

const API_BASE_URL = 'https://test-server.example.com/api'; // Replace with actual URL

// Make sure you have this export
export const fetchTopProducts = async (company, category, limit) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { company, category, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Fetch products failed:', error);
    throw error;
  }
};

// If you have other API functions, export them too
export const registerWithEcommerce = async () => {
  // ... implementation
};