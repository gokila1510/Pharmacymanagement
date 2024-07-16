// BlurredBackgroundLayout.js

import React from 'react';
import './BlurredBackgroundLayout.css'; // Import CSS for styling

const BlurredBackgroundLayout = ({ children }) => {
  return (
    <div className="blurred-background-layout">
      <div className="content">{children}</div>
    </div>
  );
};

export default BlurredBackgroundLayout;
