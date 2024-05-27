import React from 'react';

const Upload = () => {
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const handleVideoUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('videos', files[i]);
        }

        const csrfToken = getCookie('csrftoken');

        try {
            const response = await fetch('http://localhost:8001/upload_video_data/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            const data = await response.json();
            console.log('Upload success:', data);
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };

    const handleFaceUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        const csrfToken = getCookie('csrftoken');

        try {
          const response = await fetch('http://localhost:8001/upload_face_data/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),  // CSRF 토큰을 요청 헤더에 추가
            },
            body: formData,
        });
            const data = await response.json();
            console.log('Face key:', data.face_key);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div>
            <h2>Upload Videos</h2>
            <input type="file" multiple onChange={handleVideoUpload} />
            <h2>Upload Images</h2>
            <input type="file" multiple onChange={handleFaceUpload} />
        </div>
    );
};

export default Upload;
