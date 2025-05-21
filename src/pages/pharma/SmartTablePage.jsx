// src/pages/pharma/SmartTablePage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function SmartTablePage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('pharmaSmartTablePageTitle')}</h2> {/* Use translation key */}
      <p>This page will allow users to create a list of pharma/cosmetics products and get an Excel table with price comparisons using an LLM.</p>
    </div>
  );
}

export default SmartTablePage;