import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyGallery from '@/components/molecules/PropertyGallery';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import propertyService from '@/services/api/propertyService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedProperties, toggleSaveProperty } = useSavedProperties();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaved = savedProperties.some(saved => saved.propertyId === id);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Property not found');
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  const handleSaveToggle = () => {
    toggleSaveProperty(id);
    toast.success(isSaved ? 'Property removed from saved' : 'Property saved!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#F8FAFB] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600">Loading property details...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#F8FAFB] flex items-center justify-center"
      >
        <div className="text-center max-w-md">
          <ApperIcon name="Home" size={48} className="text-surface-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Property not found</h2>
          <p className="text-surface-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')} icon="ArrowLeft">
            Back to Browse
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            icon="ArrowLeft"
            size="sm"
          >
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <h2 className="text-xl font-semibold text-surface-900 mb-4">Description</h2>
              <p className="text-surface-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <Badge key={index} variant="default">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <h2 className="text-xl font-semibold text-surface-900 mb-4">Location</h2>
              <div className="aspect-video bg-surface-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="MapPin" size={48} className="text-surface-300 mx-auto mb-2" />
                  <p className="text-surface-600">Interactive map would appear here</p>
                  <p className="text-sm text-surface-500">
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-display font-bold text-surface-900">
                    {property.title}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveToggle}
                    className="p-2"
                  >
                    <ApperIcon 
                      name="Heart" 
                      size={20} 
                      className={isSaved ? 'text-red-500 fill-current' : 'text-surface-400'} 
                    />
                  </Button>
                </div>
                
                <p className="text-surface-600 mb-4">
                  {property.address}, {property.city}, {property.state} {property.zip}
                </p>

                <div className="bg-secondary text-white px-4 py-2 rounded-lg inline-block">
                  <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <ApperIcon name="Bed" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-surface-900">{property.bedrooms}</div>
                  <div className="text-sm text-surface-600">Bedrooms</div>
                </div>
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <ApperIcon name="Bath" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-surface-900">{property.bathrooms}</div>
                  <div className="text-sm text-surface-600">Bathrooms</div>
                </div>
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <ApperIcon name="Maximize" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-surface-900">
                    {property.sqft.toLocaleString()}
                  </div>
                  <div className="text-sm text-surface-600">Sq Ft</div>
                </div>
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <ApperIcon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-surface-900">{property.yearBuilt}</div>
                  <div className="text-sm text-surface-600">Year Built</div>
                </div>
              </div>

              {/* Property Type and Listing Date */}
              <div className="flex items-center justify-between mb-6">
                <Badge variant="primary">{property.type}</Badge>
                <span className="text-sm text-surface-500">
                  Listed {format(new Date(property.listingDate), 'MMM d, yyyy')}
                </span>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => toast.success('Contact feature would be implemented here')}
                >
                  Contact Agent
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => toast.success('Tour scheduling would be implemented here')}
                >
                  Schedule Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;