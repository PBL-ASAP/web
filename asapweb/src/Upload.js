import React, { useState } from 'react';
import './Upload.css';

function Upload({ setVideoFiles }) {
  const [uploadStatus, setUploadStatus] = useState('');

  const getCSRFToken = () => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, 10) === 'csrftoken=') {
          cookieValue = decodeURIComponent(cookie.substring(10));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setVideoFiles(files);

      const formData = new FormData();
      files.forEach(file => {
        formData.append('videos', file);
      });

      try {
        setUploadStatus('Uploading...');
        const response = await fetch('http://localhost:8001/upload/', {
          method: 'POST',
          body: formData,
          credentials: 'include',  // Add this line
          headers: {
            'X-CSRFToken': getCSRFToken(),
          },
        });
        const result = await response.json();
        setUploadStatus('Upload Successful!');
        console.log(result);
      } catch (error) {
        setUploadStatus('Upload Failed');
        console.error('Upload Error:', error);
      }
    } else {
      setUploadStatus('Please select files to upload.');
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Your Videos</h1>
      <input type="file" accept="video/*" multiple onChange={handleFileChange} />
      <button onClick={handleFileChange}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default Upload;
