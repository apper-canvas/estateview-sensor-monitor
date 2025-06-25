import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import FilterPanel from '@/components/molecules/FilterPanel';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import propertyService from '@/services/api/propertyService';
import { toast } from 'react-toastify';

const Browse = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    location: '',
    priceMin: null,
    priceMax: null,
    bedroomsMin: null,
    bathroomsMin: null,
    sqftMin: null,
    propertyTypes: []
  });

  const loadProperties = async (searchFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.search(searchFilters);
      setProperties(result);
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
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    loadProperties(newFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    loadProperties(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      priceMin: null,
      priceMax: null,
      bedroomsMin: null,
      bathroomsMin: null,
      sqftMin: null,
      propertyTypes: []
    };
    setFilters(clearedFilters);
    loadProperties(clearedFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-surface-900 mb-4">
            Find Your Dream Home
          </h1>
          <div className="max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-medium text-surface-900">
                  {loading ? 'Loading...' : `${properties.length} Properties`}
                </h2>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex bg-surface-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-surface-600 hover:text-surface-900'
                    }`}
                  >
                    <ApperIcon name="Grid3X3" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-surface-600 hover:text-surface-900'
                    }`}
                  >
                    <ApperIcon name="List" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
              >
                <div className="flex items-center">
                  <ApperIcon name="AlertCircle" size={20} className="text-red-600 mr-3" />
                  <div>
                    <h3 className="text-red-800 font-medium">Error loading properties</h3>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadProperties()}
                    className="ml-auto"
                  >
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Properties Grid */}
            <PropertyGrid
              properties={properties}
              viewMode={viewMode}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Browse;