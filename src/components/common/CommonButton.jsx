import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CommonButton = ({
  text,
  isLink = false,
  to = '/',
  type = 'button',
  onClick,
  bgVariant = 'bg-Primary',
  hoverVariant = 'hover:bg-Primary/90',
  textVariant = 'text-Secondary',
  showIcon = true,
  className = ''
}) => {
  const baseClasses = `flex items-center justify-center gap-2 ${bgVariant} ${hoverVariant} ${textVariant} font-bold text-[16px] py-3.5 px-8 rounded-xl transition duration-300 shadow-custom hover:shadow-lg ${className}`;

  if (isLink) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {text}
        {showIcon && <ArrowUpRight size={20} strokeWidth={2.5} />}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={baseClasses}
    >
      {text}
      {showIcon && <ArrowUpRight size={20} strokeWidth={2.5} />}
    </button>
  );
};

export default CommonButton;