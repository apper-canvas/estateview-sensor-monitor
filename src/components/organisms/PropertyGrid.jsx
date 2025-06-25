import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from "@/components/ApperIcon";
import PropertyCard from '@/components/molecules/PropertyCard'
function PropertyGrid({ properties, viewMode, loading }) {
  const skeletonCount = Array.from({ length: 6 }, (_, i) => i);
  
  if (loading) {
    return (
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "space-y-4"
      }>
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="animate-pulse">
              <div className={`bg-surface-200 ${viewMode === 'grid' ? 'h-48' : 'h-32'}`} />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-surface-200 rounded w-3/4" />
                <div className="h-4 bg-surface-200 rounded w-1/2" />
                <div className="flex space-x-4">
                  <div className="h-3 bg-surface-200 rounded w-16" />
                  <div className="h-3 bg-surface-200 rounded w-16" />
                  <div className="h-3 bg-surface-200 rounded w-16" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium text-surface-900">No properties found</h3>
        <p className="mt-2 text-surface-500">Try adjusting your search criteria or filters</p>
      </motion.div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-4"
    }>
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard property={property} viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;