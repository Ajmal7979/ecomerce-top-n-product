export const generateProductId = (product) => {
  // Create unique ID using company, name, and a hash
  return `${product.company}-${product.name}-${Math.random().toString(36).substring(2, 9)}`;
};

export const getRandomImage = () => {
  const images = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300/ff0000',
    'https://via.placeholder.com/300/00ff00',
    'https://via.placeholder.com/300/0000ff',
    'https://via.placeholder.com/300/ffff00'
  ];
  return images[Math.floor(Math.random() * images.length)];
};