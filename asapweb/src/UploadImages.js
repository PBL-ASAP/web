import React from 'react';

const UploadImages = ({ setFaceKey }) => {
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
            formData.append('images', files[i]);
        }

        const csrfToken = getCookie('csrftoken');

        try {
            const response = await fetch('http://localhost:8001/upload_face_data/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });
            const data = await response.json();
            setFaceKey(data.face_key);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div>
            <h2>Upload Images</h2>
            <input type="file" multiple onChange={handleFileChange} />
        </div>
    );
};

export default UploadImages;