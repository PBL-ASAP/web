import React from 'react';
import './Home.css';

function Home({ videoFiles = [] }) { // videoFiles가 undefined일 경우 빈 배열을 기본값으로 설정
  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="video-preview-container">
        {videoFiles.length > 0 ? (
          videoFiles.map((file, index) => (
            <video key={index} controls width="240" height="160">
              <source src={URL.createObjectURL(file)} type="video/mp4" />
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
