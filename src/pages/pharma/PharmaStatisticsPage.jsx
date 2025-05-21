// src/pages/pharma/PharmaStatisticsPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function PharmaStatisticsPage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('pharmaStatisticsPageTitle')}</h2> {/* Use translation key */}
      <p>This page will display interesting statistics about pharma & cosmetics products and prices.</p>
    </div>
  );
}

export default PharmaStatisticsPage;