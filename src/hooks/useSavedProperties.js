import { useState, useEffect } from 'react';

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  // Load saved properties from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      try {
        setSavedProperties(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved properties:', error);
        setSavedProperties([]);
      }
    }
  }, []);

  // Save to localStorage whenever savedProperties changes
  useEffect(() => {
    localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
  }, [savedProperties]);

  const toggleSaveProperty = (propertyId) => {
    setSavedProperties(prev => {
      const isAlreadySaved = prev.some(saved => saved.propertyId === propertyId);
      
      if (isAlreadySaved) {
        return prev.filter(saved => saved.propertyId !== propertyId);
      } else {
        return [...prev, {
          propertyId,
          savedDate: new Date().toISOString()
        }];
      }
    });
  };

  const isSaved = (propertyId) => {
    return savedProperties.some(saved => saved.propertyId === propertyId);
  };

  const getSavedProperty = (propertyId) => {
    return savedProperties.find(saved => saved.propertyId === propertyId);
  };

  return {
    savedProperties,
    toggleSaveProperty,
    isSaved,
    getSavedProperty
  };
};