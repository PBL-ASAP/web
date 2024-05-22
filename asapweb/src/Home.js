import React from 'react';
import './Home.css';

function Home({ videoFiles }) {
  return (
    <div className="home-container">
      <h1>ASAP Home</h1>
      <div className="video-preview-container">
        {videoFiles.length > 0 ? (
          videoFiles.map((file, index) => (
            <video key={index} controls width="240" height="160">
              <source src={`http://localhost:8001/media/${file}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))
        ) : (
          <p>No videos uploaded</p>
        )}
      </div>
    </div>
  );
}

export default Home;
