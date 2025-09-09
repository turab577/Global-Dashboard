'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'filled' | 'bordered' | 'primary' | 'secondary' | 'success' | 'danger'
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'filled',
  onClick = () => console.log('Button clicked'),
  className = ''
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors border'
  
  const variantClasses = {
    filled: 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600 !bg-blue-600 !text-white cursor-pointer hover:border-blue-600',
    bordered: 'border-blue-500 cursor-pointer text-blue-500 hover:bg-blue-50',
    primary: 'bg-blue-500 cursor-pointer border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600',
    secondary: 'bg-gray-500 cursor-pointer border-gray-500 text-white hover:bg-gray-600 hover:border-gray-600',
    success: 'bg-green-500 cursor-pointer border-green-500 text-white hover:bg-green-600 hover:border-green-600',
    danger: 'bg-red-500 cursor-pointer border-red-500 text-white hover:bg-red-600 hover:border-red-600'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button