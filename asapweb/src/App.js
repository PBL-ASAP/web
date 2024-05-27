import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import FindMyFace from './FindMyFace';
import Upload from './Upload';
import './App.css';

function App() {
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/videos/');
        const result = await response.json();
        setVideoFiles(result.video_files);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

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
          <Route path="/" element={<Home videoFiles={videoFiles} />} />
          <Route path="/find-my-face" element={<FindMyFace />} />
          <Route path="/upload" element={<Upload setVideoFiles={setVideoFiles} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;