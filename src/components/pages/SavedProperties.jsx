import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import propertyService from '@/services/api/propertyService';
import { toast } from 'react-toastify';

const SavedProperties = () => {
  const { savedProperties, toggleSaveProperty } = useSavedProperties();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const loadSavedProperties = async () => {
    if (savedProperties.length === 0) {
      setProperties([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const propertiesPromises = savedProperties.map(saved => 
        propertyService.getById(saved.propertyId)
      );
      const results = await Promise.allSettled(propertiesPromises);
      
      const validProperties = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      
      // Sort by saved date (most recent first)
      const sortedProperties = validProperties.sort((a, b) => {
        const aSaved = savedProperties.find(s => s.propertyId === a.Id.toString());
        const bSaved = savedProperties.find(s => s.propertyId === b.Id.toString());
        return new Date(bSaved.savedDate) - new Date(aSaved.savedDate);
      });

      setProperties(sortedProperties);
    } catch (err) {
      setError(err.message || 'Failed to load saved properties');
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProperties();
  }, [savedProperties]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved properties?')) {
      savedProperties.forEach(saved => {
        toggleSaveProperty(saved.propertyId);
      });
      toast.success('All saved properties cleared');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-surface-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-surface-600">
              Properties you've saved for later viewing
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {properties.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  icon="Trash2"
                  size="sm"
                >
                  Clear All
                </Button>
                
                {/* View Toggle */}
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
              </>
            )}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-surface-600">
              {properties.length} saved {properties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        )}

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
                <h3 className="text-red-800 font-medium">Error loading saved properties</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadSavedProperties}
                className="ml-auto"
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && savedProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Heart" className="w-20 h-20 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="mt-6 text-xl font-medium text-surface-900">No saved properties yet</h3>
            <p className="mt-2 text-surface-500 max-w-md mx-auto">
              Start browsing properties and save your favorites by clicking the heart icon
            </p>
            <motion.div className="mt-8">
              <Button
                onClick={() => window.location.href = '/'}
                icon="Search"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Properties
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Properties Grid */}
        {(loading || properties.length > 0) && (
          <PropertyGrid
            properties={properties}
            viewMode={viewMode}
            loading={loading}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SavedProperties;