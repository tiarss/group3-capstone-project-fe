import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WebRoute } from './routes/WebRoute';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <WebRoute />
    </div>
  );
}

export default App;
