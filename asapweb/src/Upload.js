import React, { useState } from 'react';
import './Upload.css';

function Upload({ setVideoFiles }) {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setVideoFiles(files);  // 로컬 상태 업데이트

      const formData = new FormData();
      files.forEach(file => {
        formData.append('videos', file);
      });

      try {
        setUploadStatus('Uploading...');
        const response = await fetch('YOUR_SERVER_ENDPOINT/upload', {
          method: 'POST',
          body: formData,
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

/*이 코드는 다음과 같은 기능을 추가합니다:

사용자가 여러 비디오 파일을 선택하면, 이를 서버로 전송합니다.
서버에서는 파일을 받아 얼굴 인식 처리를 수행하고, 결과를 클라이언트로 반환합니다.
업로드 상태를 사용자에게 피드백으로 제공합니다.
서버 측 API 구현
서버 측에서는 /upload 엔드포인트에서 비디오 파일을 받고, 필요한 얼굴 인식 처리를 수행한 후 결과를 반환하는 로직을 구현해야 합니다. 이 부분은 해당 기술 스택에 따라 다르게 구현될 수 있습니다.

이와 같이 코드를 수정하면, 프로젝트의 목표에 한층 더 다가갈 수 있습니다.*/






