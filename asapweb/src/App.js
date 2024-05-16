import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import FindMyFace from './FindMyFace';
import Upload from './Upload';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);

  return (
    <Router>
      <div className="app">
        <div className="sidebar">
          <div className="logo">ASAP</div>
          <div className="menu">
            <Link to="/">HOME</Link>
            <Link to="/find-my-face">FIND MY FACE</Link>
            <Link to="/upload">UPLOAD</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home videoFile={videoFile} />} />
          <Route path="/find-my-face" element={<FindMyFace />} />
          <Route path="/upload" element={<Upload setVideoFile={setVideoFile} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

