import React, { useState } from 'react';
import './Upload.css';

function Upload({ setVideoFiles }) {
  const handleFileChange = (event) => {
    // 파일 여러 개 선택 가능
    setVideoFiles([...event.target.files]);
  };

  return (
    <div className="upload-container">
      <h1>Upload Your Videos</h1>
      <input type="file" accept="video/*" multiple onChange={handleFileChange} />
      <button onClick={() => console.log("Files selected")}>Upload</button>
    </div>
  );
}

export default Upload;
