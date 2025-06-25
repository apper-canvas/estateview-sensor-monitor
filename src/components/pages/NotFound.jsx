import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFB] flex items-center justify-center"
    >
      <div className="text-center max-w-md px-4">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <ApperIcon name="Home" size={80} className="text-surface-300 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-4xl font-display font-bold text-surface-900 mb-4">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-surface-800 mb-4">
          Property Not Found
        </h2>
        
        <p className="text-surface-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            icon="Home"
            size="lg"
            className="w-full sm:w-auto"
          >
            Browse Properties
          </Button>
          
          <div>
            <Button 
              variant="ghost"
              onClick={() => navigate(-1)}
              icon="ArrowLeft"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;