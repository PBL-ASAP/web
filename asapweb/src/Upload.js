import React, { useState } from 'react';

const Upload = () => {
    const [faceKey, setFaceKey] = useState(null);

    const handleFaceUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            const response = await fetch('http://localhost:8001/upload_face_data/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.status === 'success') {
                setFaceKey(data.face_key);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleVideoUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('videos', files[i]);
        }

        try {
            const response = await fetch('http://localhost:8001/upload_video_data/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Upload success:', data);
        } catch (error) {
            console.error('Error uploading videos:', error);
        }
    };

    return (
        <div>
            <h2>Upload Images</h2>
            <input type="file" multiple onChange={handleFaceUpload} />
            {faceKey && <p>Face key: {faceKey}</p>}
            <h2>Upload Videos</h2>
            <input type="file" multiple onChange={handleVideoUpload} />
        </div>
    );
};

export default Upload;
