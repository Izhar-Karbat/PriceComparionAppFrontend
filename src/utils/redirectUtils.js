// src/utils/redirectUtils.js

/**
 * Build target site URLs based on recognized product information
 * @param {Object} product - The recognized product object
 * @param {string} type - The type of product (supermarket, electronics, pharma)
 * @returns {string} The URL to redirect to
 */
export const buildTargetSiteUrl = (product, type = 'supermarket') => {
  // In a real implementation, this would use actual retailer URLs and product information
  // Mock implementation for testing
  const mockRetailers = {
    supermarket: {
      shufersal: 'https://www.shufersal.co.il/online/he/search?text=',
      ramilevi: 'https://www.rami-levy.co.il/he/online/search?q=',
      victory: 'https://www.victoryonline.co.il/search?q='
    },
    electronics: {
      ksp: 'https://ksp.co.il/search/q=',
      bug: 'https://www.bug.co.il/search?q=',
      ivory: 'https://www.ivory.co.il/catalog.php?act=cat&q='
    },
    pharma: {
      superpharm: 'https://shop.super-pharm.co.il/search?q=',
      goodpharm: 'https://www.goodpharm.co.il/catalogsearch/result/?q='
    }
  };

  // Get a random retailer for the specified type
  const retailers = mockRetailers[type] || mockRetailers.supermarket;
  const retailerKeys = Object.keys(retailers);
  const randomRetailer = retailerKeys[Math.floor(Math.random() * retailerKeys.length)];
  
  // Get the base URL
  const baseUrl = retailers[randomRetailer];
  
  // Get the search term from the product
  const searchTerm = encodeURIComponent(product.name || product.productName || '');
  
  return `${baseUrl}${searchTerm}`;
};

/**
 * Handle the redirect to a target site
 * @param {Object} product - The recognized product object
 * @param {string} type - The type of product (supermarket, electronics, pharma)
 * @param {boolean} newTab - Whether to open in a new tab
 */
export const redirectToTargetSite = (product, type = 'supermarket', newTab = true) => {
  if (!product) {
    console.error('Cannot redirect: No product information provided');
    return;
  }

  const targetUrl = buildTargetSiteUrl(product, type);
  
  if (newTab) {
    window.open(targetUrl, '_blank');
  } else {
    window.location.href = targetUrl;
  }
  
  console.log(`Redirecting to ${targetUrl} for product: ${product.name || product.productName}`);
  return targetUrl; // Return URL for testing purposes
};