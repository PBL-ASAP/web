import React from 'react';

const UploadVideos = () => {
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

    const handleFileChange = async (event) => {
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

    return (
        <div>
            <h2>Upload Videos</h2>
            <input type="file" multiple onChange={handleFileChange} />
        </div>
    );
};

export default UploadVideos;
