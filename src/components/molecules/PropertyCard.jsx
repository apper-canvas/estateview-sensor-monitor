import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import { toast } from 'react-toastify';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { savedProperties, toggleSaveProperty } = useSavedProperties();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isSaved = savedProperties.some(saved => saved.propertyId === property.Id.toString());

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    toggleSaveProperty(property.Id.toString());
    toast.success(isSaved ? 'Property removed from saved' : 'Property saved!');
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface-200 animate-pulse rounded-l-lg" />
            )}
            <img
              src={property.images[0]}
              alt={property.title}
              className={`w-full h-full object-cover rounded-l-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <button
              onClick={handleSaveToggle}
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
            >
              <ApperIcon 
                name="Heart" 
                size={16} 
                className={isSaved ? 'text-red-500 fill-current' : 'text-surface-400'} 
              />
            </button>
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-semibold text-surface-900 truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-surface-600 truncate">
                  {property.address}, {property.city}, {property.state}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="bg-secondary text-white px-3 py-1 rounded-md font-semibold">
                  {formatPrice(property.price)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-surface-600">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1" />
                {property.bedrooms} beds
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1" />
                {property.bathrooms} baths
              </div>
              <div className="flex items-center">
                <ApperIcon name="Maximize" size={16} className="mr-1" />
                {property.sqft.toLocaleString()} sqft
              </div>
              <Badge variant="default" size="sm">
                {property.type}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-200 animate-pulse rounded-t-lg h-48" />
        )}
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-48 object-cover rounded-t-lg transition-all duration-300 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <button
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
        >
          <ApperIcon 
            name="Heart" 
            size={18} 
            className={isSaved ? 'text-red-500 fill-current' : 'text-surface-400'} 
          />
        </button>
        <div className="absolute bottom-3 left-3">
          <div className="bg-secondary text-white px-3 py-1 rounded-md font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-display font-semibold text-surface-900 mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-sm text-surface-600 mb-3 truncate">
          {property.address}, {property.city}, {property.state}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-surface-600">
            <div className="flex items-center">
              <ApperIcon name="Bed" size={16} className="mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <ApperIcon name="Bath" size={16} className="mr-1" />
              {property.bathrooms}
            </div>
            <div className="flex items-center">
              <ApperIcon name="Maximize" size={16} className="mr-1" />
              {property.sqft.toLocaleString()}
            </div>
          </div>
          <Badge variant="default" size="sm">
            {property.type}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;