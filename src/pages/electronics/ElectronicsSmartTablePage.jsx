// src/pages/electronics/ElectronicsSmartTablePage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function ElectronicsSmartTablePage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('electronicsSmartTablePageTitle')}</h2> {/* Use translation key */}
      <p>This page will allow users to create a list of electronics products and get an Excel table with price comparisons using an LLM.</p>
    </div>
  );
}

export default ElectronicsSmartTablePage;