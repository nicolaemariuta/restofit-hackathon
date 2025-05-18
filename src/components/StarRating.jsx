import React, { useState } from 'react';

const StarRating = ({ rating = 0, onChange }) => {
  const [hovered, setHovered] = useState(null);

  const handleClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div style={{ display: 'flex', gap: '4px', cursor: 'pointer', fontSize: '20px' }}>
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = hovered !== null ? value <= hovered : value <= rating;
        return (
          <span
            key={value}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(value)}
            style={{ color: isFilled ? '#facc15' : '#d1d5db', transition: 'color 0.2s' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
