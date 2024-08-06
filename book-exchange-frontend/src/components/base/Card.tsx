// book-exchange-frontend/src/components/base/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      {children}
    </div>
  );
};

export default Card;