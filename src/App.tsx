import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContent } from './components/AppContent';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;