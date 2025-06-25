import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyCard from '@/components/molecules/PropertyCard';

const PropertyMap = ({ properties, selectedProperty, onPropertySelect }) => {
  const [mapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [zoom] = useState(11);

  // Mock map implementation - in a real app, you'd use Google Maps, Mapbox, etc.
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(price);
  };

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className="flex-1 relative bg-surface-100 rounded-lg overflow-hidden">
        {/* Mock map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
          <button className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
            <ApperIcon name="Plus" size={18} className="text-surface-600" />
          </button>
          <button className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
            <ApperIcon name="Minus" size={18} className="text-surface-600" />
          </button>
        </div>

        {/* Property Markers */}
        {properties.map((property, index) => {
          // Calculate position based on lat/lng (mock positioning)
          const left = 20 + (index % 4) * 20;
          const top = 20 + Math.floor(index / 4) * 25;
          
          return (
            <motion.button
              key={property.Id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onPropertySelect(property)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${
                selectedProperty?.Id === property.Id ? 'z-30' : 'z-20'
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Marker Pin */}
              <div className={`relative ${
                selectedProperty?.Id === property.Id 
                  ? 'text-accent' 
                  : 'text-primary hover:text-accent'
              } transition-colors duration-200`}>
                <ApperIcon name="MapPin" size={32} className="drop-shadow-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ApperIcon name="Home" size={12} className="text-white" />
                </div>
              </div>
              
              {/* Price Tooltip */}
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
                bg-white px-2 py-1 rounded-md shadow-lg text-xs font-semibold whitespace-nowrap
                transition-all duration-200 ${
                  selectedProperty?.Id === property.Id 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                {formatPrice(property.price)}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                  border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
              </div>
            </motion.button>
          );
        })}

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-surface-500 bg-white/80 px-2 py-1 rounded">
          Map data simulation
        </div>
      </div>

      {/* Property Sidebar */}
      <div className="w-80 bg-white border-l border-surface-200 overflow-y-auto">
        <div className="p-4 border-b border-surface-200">
          <h3 className="font-medium text-surface-900">
            {properties.length} Properties
          </h3>
          <p className="text-sm text-surface-600">Click markers to view details</p>
        </div>
        
        <div className="p-4 space-y-4">
          {properties.map((property) => (
            <motion.div
              key={property.Id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`cursor-pointer rounded-lg transition-all duration-200 ${
                selectedProperty?.Id === property.Id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onPropertySelect(property)}
            >
              <PropertyCard property={property} viewMode="list" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;