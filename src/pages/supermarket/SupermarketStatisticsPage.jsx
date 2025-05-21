// src/pages/supermarket/SupermarketStatisticsPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function SupermarketStatisticsPage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('supermarketStatisticsPageTitle')}</h2> {/* Use translation key */}
      <p>This page will display interesting statistics about supermarket products and prices.</p>
    </div>
  );
}

export default SupermarketStatisticsPage;