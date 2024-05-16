import React from 'react';
import './App.css';

function Home({ videoFile }) {
  return (
    <div>
      <h1>Home</h1>
      {videoFile && (
        <video controls width="320" height="240">
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!videoFile && <p>No video uploaded</p>}
    </div>
  );
}

export default Home;
