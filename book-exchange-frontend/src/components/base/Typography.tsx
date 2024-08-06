// book-exchange-frontend/src/components/base/Typography.tsx
import React, { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'body';
  children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'body', children }) => {
  const variantStyles = {
    h1: 'text-4xl font-bold text-gray-dark',
    h2: 'text-3xl font-semibold text-gray-dark',
    body: 'text-base text-gray',
  };

  return <div className={variantStyles[variant]}>{children}</div>;
};

export default Typography;