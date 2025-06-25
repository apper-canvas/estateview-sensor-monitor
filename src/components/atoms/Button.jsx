import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary shadow-sm hover:shadow-md",
    accent: "bg-accent text-white hover:bg-accent/90 focus:ring-accent shadow-sm hover:shadow-md",
    outline: "border border-surface-300 text-surface-700 hover:bg-surface-50 hover:border-surface-400 focus:ring-primary",
    ghost: "text-surface-700 hover:bg-surface-100 focus:ring-primary"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={iconSize[size]} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={iconSize[size]} className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;