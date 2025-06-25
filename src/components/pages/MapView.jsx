import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyMap from '@/components/organisms/PropertyMap';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';
import propertyService from '@/services/api/propertyService';
import { toast } from 'react-toastify';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProperties = async (location = '') => {
    setLoading(true);
    setError(null);
    try {
      const filters = location ? { location } : {};
      const result = await propertyService.search(filters);
      setProperties(result);
      if (result.length > 0 && !selectedProperty) {
        setSelectedProperty(result[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSearch = (location) => {
    setSearchQuery(location);
    loadProperties(location);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  if (loading && properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen bg-[#F8FAFB] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600">Loading map...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen bg-[#F8FAFB] flex items-center justify-center"
      >
        <div className="text-center max-w-md">
          <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Failed to load map</h2>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={() => loadProperties()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-[#F8FAFB] flex flex-col overflow-hidden"
    >
      {/* Search Header */}
      <div className="flex-shrink-0 bg-white border-b border-surface-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-md">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search area on map..."
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="h-full bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden">
          {properties.length > 0 ? (
            <PropertyMap
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="Map" size={48} className="text-surface-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900">No properties found</h3>
                <p className="text-surface-600">Try searching for a different location</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;