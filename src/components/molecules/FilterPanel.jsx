import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const propertyTypes = ['House', 'Condo', 'Townhouse', 'Apartment'];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    handleFilterChange('propertyTypes', newTypes);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.bedroomsMin) count++;
    if (filters.bathroomsMin) count++;
    if (filters.sqftMin) count++;
    if (filters.propertyTypes && filters.propertyTypes.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200">
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" size={18} className="text-surface-600" />
            <h3 className="font-medium text-surface-900">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <Badge variant="primary" size="sm">
                {getActiveFilterCount()}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              icon={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
              className="md:hidden"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ height: 'auto' }}
          animate={{ height: isExpanded || window.innerWidth >= 768 ? 'auto' : 0 }}
          exit={{ height: 0 }}
          className="md:block overflow-hidden"
        >
          <div className="p-4 space-y-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Price Range</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.priceMin || ''}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : null)}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.priceMax || ''}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Property Type</h4>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handlePropertyTypeToggle(type)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      (filters.propertyTypes || []).includes(type)
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Minimum Bedrooms</h4>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleFilterChange('bedroomsMin', filters.bedroomsMin === num ? null : num)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filters.bedroomsMin === num
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Minimum Bathrooms</h4>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleFilterChange('bathroomsMin', filters.bathroomsMin === num ? null : num)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filters.bathroomsMin === num
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <h4 className="font-medium text-surface-900 mb-3">Minimum Square Feet</h4>
              <Input
                type="number"
                placeholder="Min sqft"
                value={filters.sqftMin || ''}
                onChange={(e) => handleFilterChange('sqftMin', e.target.value ? parseInt(e.target.value) : null)}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;