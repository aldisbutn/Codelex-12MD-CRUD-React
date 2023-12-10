import React from 'react';

interface HeaderProps {
  driverCount: number;
}

export const Header: React.FC<HeaderProps> = ({ driverCount }) => {
  return (
    <div>
      <h1>Driver Registry</h1>
      <h2>{`There are currently ${driverCount} registered drivers`}</h2>
    </div>
  );
};
