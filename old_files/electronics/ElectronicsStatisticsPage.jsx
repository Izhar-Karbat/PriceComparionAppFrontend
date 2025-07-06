// src/pages/electronics/ElectronicsStatisticsPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function ElectronicsStatisticsPage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('electronicsStatisticsPageTitle')}</h2> {/* Use translation key */}
      <p>This page will display interesting statistics about electronics products and prices.</p>
    </div>
  );
}

export default ElectronicsStatisticsPage;