import React, { useState } from 'react';

function UploadImage({ onProcessImage }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);

    // 서버로 이미지 전송 및 얼굴 데이터 처리 요청
    const response = await fetch('YOUR_SERVER_ENDPOINT', {
      method: 'POST',
      body: formData,
    });
    const faceData = await response.json();
    onProcessImage(faceData); // 처리된 얼굴 데이터를 상위 컴포넌트로 전달
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Upload and Analyze</button>
    </div>
  );
}

export default UploadImage;
