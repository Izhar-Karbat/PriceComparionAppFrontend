// src/data/mock-data.ts

// Add this export to the file.
export const mockProductDetails = {
  masterproductid: '456',
  productName: 'קרם הגנה לפנים SPF50',
  brand: 'Life',
  imageUrl: 'https://via.placeholder.com/250', // Use a larger image placeholder
  healthScore: 'B',
  ingredients: ['Aqua', 'Octocrylene', 'Glycerin', 'Titanium Dioxide'],
  israeliPrices: [
    { retailerName: 'Super-Pharm', price: 49.90 },
    { retailerName: 'Be Pharm', price: 52.50 },
    { retailerName: 'Good Pharm', price: 47.90 },
  ],
  internationalAlternatives: [
    {
      productName: 'Sunscreen Face Cream SPF50',
      brand: 'CeraVe',
      imageUrl: 'https://via.placeholder.com/250',
      finalPriceNIS: 65.00,
      trustLabel: 'similar', // 'identical', 'similar', 'relevant'
      userVotes: { good: 12, bad: 2 },
    },
    {
      productName: 'UV Face Sunscreen SPF50+',
      brand: 'La Roche-Posay',
      imageUrl: 'https://via.placeholder.com/250',
      finalPriceNIS: 72.00,
      trustLabel: 'relevant',
      userVotes: { good: 45, bad: 1 },
    },
  ],
};

export const mockCartItems = [
  {
    masterproductid: '123',
    productName: 'שמפו לשיער יבש פינוק',
    brand: 'פינוק',
    imageUrl: 'https://via.placeholder.com/150',
    quantity: 1,
    price: 14.9,
  },
  {
    masterproductid: '456',
    productName: 'קרם הגנה SPF50',
    brand: 'Life',
    imageUrl: 'https://via.placeholder.com/150',
    quantity: 2,
    price: 49.9,
  },
];

export const mockCartComparison = [
  { retailerName: 'Super-Pharm', total: 114.70 },
  { retailerName: 'Be Pharm', total: 119.90 },
  { retailerName: 'Good Pharm', total: 109.50 }, // Cheapest
];