// src/pages/pharma/PharmaProductSearchPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

function PharmaProductSearchPage() {
  const { t } = useTranslation(); // Initialize

  return (
    <div>
      <h2>{t('pharmaProductSearchPageTitle')}</h2> {/* Use translation key */}
      <p>This is where the product search functionality for pharma & cosmetics will go.</p>
    </div>
  );
}

export default PharmaProductSearchPage;