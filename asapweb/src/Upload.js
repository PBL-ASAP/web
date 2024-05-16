import React from 'react';
import './Upload.css';

function Upload({ setVideoFile }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file); // 부모 컴포넌트에 파일 상태 업데이트
    }
  };

  return (
    <div>
      <h1>Upload Your Video</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={() => console.log("File selected")}>Upload</button>
    </div>
  );
}

export default Upload;
