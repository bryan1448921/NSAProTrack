import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>NSA Pro Track</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 